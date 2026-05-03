import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  Search,
  Star,
  ShoppingCart,
  Eye,
  X,
  ChevronDown,
} from "lucide-react";
import { products, categories } from "../data/products";
import { useCartStore } from "../store/cartStore";

const brands = [...new Set(products.map((p) => p.brand))].sort();
const maxPrice = Math.max(...products.map((p) => p.price));

function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col group">
      <div
        className="relative overflow-hidden bg-gray-50"
        style={{ aspectRatio: "1/1" }}
      >
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {discount && (
          <span className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {!discount && product.badge && (
          <span className="absolute top-3 left-3 bg-[#0A2342] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        <Link
          to={`/product/${product.id}`}
          className="absolute top-3 right-3 bg-white text-[#0A2342] p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#0A2342] hover:text-white"
        >
          <Eye size={14} />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-1 text-center">
        <p className="text-[11px] text-gray-400 font-medium mb-1">
          {product.brand}
        </p>
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="text-[13px] font-medium text-gray-800 leading-snug hover:text-[#0A2342] transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={10}
              className={
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-200 fill-gray-200"
              }
            />
          ))}
          <span className="text-[11px] text-gray-400 ml-1">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-[15px] font-bold text-[#0A2342]">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-[12px] text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={() => addItem(product)}
          className="w-full bg-[#0A2342] text-white text-[12px] font-bold py-2.5 rounded-full hover:bg-[#FF6B35] transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={13} /> Add to cart
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceMax, setPriceMax] = useState(Math.ceil(maxPrice));
  const [sortBy, setSortBy] = useState("default");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const activeCat = searchParams.get("cat") || "";
  const searchQ = searchParams.get("search") || "";
  const brandParam = searchParams.get("brand") || "";

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCat) list = list.filter((p) => p.category === activeCat);
    if (searchQ)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQ.toLowerCase()),
      );
    list = list.filter((p) => p.price <= priceMax);
    if (brandParam) list = list.filter((p) => p.brand === brandParam);
    else if (selectedBrands.length > 0)
      list = list.filter((p) => selectedBrands.includes(p.brand));
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCat, searchQ, priceMax, selectedBrands, sortBy, minRating, brandParam]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
    setPage(1);
  };

  const clearFilters = () => {
    setPriceMax(Math.ceil(maxPrice));
    setSelectedBrands([]);
    setMinRating(0);
    setSortBy("default");
    setPage(1);
    setSearchParams({});
  };

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const hasFilters =
    activeCat ||
    searchQ ||
    selectedBrands.length > 0 ||
    minRating > 0 ||
    priceMax < Math.ceil(maxPrice);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#0A2342] py-12 px-4 text-center">
        <h1 className="text-4xl font-black text-white mb-2">Our Products</h1>
        <p className="text-[#00B4D8] text-[15px]">
          Professional Fishing & Diving Equipment
        </p>
      </div>

      <div className="w-full px-4 py-8" style={{ paddingRight: "20px" }}>
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-200" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden flex items-center gap-2 bg-[#0A2342] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#FF6B35] transition-colors"
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 border border-gray-200 bg-white px-3 py-2 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors"
              >
                <X size={13} /> Clear filters
              </button>
            )}
            {searchQ && (
              <span className="flex items-center gap-2 bg-[#0A2342]/5 border border-[#0A2342]/10 text-[#0A2342] px-3 py-1.5 rounded-full text-sm font-medium">
                "{searchQ}"
                <button onClick={() => { searchParams.delete("search"); setSearchParams(searchParams); }}>
                  <X size={13} className="opacity-50 hover:opacity-100 transition-opacity" />
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-sm px-4 py-2.5 rounded-lg outline-none text-[#0A2342] font-medium cursor-pointer hover:border-[#0A2342] transition-colors"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            style={{ paddingLeft: "20px" }}
            className={`${filtersOpen ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0 lg:ml-10`}
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24 overflow-hidden">

              {/* Panel header */}
              <div className="bg-[#0A2342] px-5 py-4">
                <h2 className="text-white font-bold text-[18px] uppercase tracking-widest flex items-center gap-2">
                  <SlidersHorizontal size={14} /> Filters
                </h2>
              </div>

              {/* Categories */}
              <div className="px-5 py-7 border-b border-gray-100">
                <h3 className="text-[15px] font-bold text-[#FF6B35] uppercase tracking-widest mb-4">Category</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => { searchParams.delete("cat"); setSearchParams(searchParams); }}
                      className={`w-full text-left text-[13px] py-2 px-3 rounded-lg transition-all font-medium ${!activeCat ? "bg-[#0A2342] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-[#0A2342]"}`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        onClick={() => setSearchParams({ cat: cat.slug })}
                        className={`w-full text-left text-[13px] py-2 px-3 rounded-lg transition-all font-medium ${activeCat === cat.slug ? "bg-[#0A2342] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-[#0A2342]"}`}
                      >
                        <span>{cat.icon} {cat.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="px-5 py-7 border-b border-gray-100">
                <h3 className="text-[15px] font-bold text-[#FF6B35] uppercase tracking-widest mb-4">Price Range</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] text-gray-400">$0</span>
                  <span className="text-[13px] font-bold text-[#0A2342] bg-[#0A2342]/5 px-3 py-1 rounded-full">up to ${priceMax}</span>
                  <span className="text-[12px] text-gray-400">${Math.ceil(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.ceil(maxPrice)}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#0A2342]"
                />
              </div>

              {/* Brands */}
              <div className="px-5 py-7 border-b border-gray-100">
                <h3 className="text-[15px] font-bold text-[#FF6B35] uppercase tracking-widest mb-4">Brand</h3>
                <ul className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {brands.map((brand) => (
                    <li key={brand}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${selectedBrands.includes(brand) ? "bg-[#0A2342] border-[#0A2342]" : "border-gray-300 group-hover:border-[#0A2342]"}`}>
                          {selectedBrands.includes(brand) && (
                            <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          )}
                          <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="sr-only" />
                        </div>
                        <span className={`text-[13px] font-medium transition-colors ${selectedBrands.includes(brand) ? "text-[#0A2342]" : "text-gray-500 group-hover:text-[#0A2342]"}`}>{brand}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating */}
              <div className="px-5 py-7">
                <h3 className="text-[15px] font-bold text-[#FF6B35] uppercase tracking-widest mb-4">Min Rating</h3>
                <div className="space-y-2">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${minRating === r ? "bg-[#0A2342] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-[#0A2342]"}`}
                    >
                      {r === 0 ? "All ratings" : (
                        <>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={11} className={i < r ? "text-yellow-400 fill-yellow-400" : (minRating === r ? "text-white/30 fill-white/30" : "text-gray-200 fill-gray-200")} />
                            ))}
                          </div>
                          <span>& up</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Search
                  size={60}
                  strokeWidth={1}
                  className="mx-auto mb-4 opacity-30"
                />
                <p className="text-xl font-semibold">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#00B4D8] hover:underline text-sm"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {paginated.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => {
                        setPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#0A2342] hover:text-[#0A2342] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (n) => (
                        <button
                          key={n}
                          onClick={() => {
                            setPage(n);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                            page === n
                              ? "bg-[#0A2342] text-white"
                              : "border border-gray-200 text-gray-600 hover:border-[#0A2342] hover:text-[#0A2342]"
                          }`}
                        >
                          {n}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() => {
                        setPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#0A2342] hover:text-[#0A2342] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
