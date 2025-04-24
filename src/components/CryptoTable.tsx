import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Asset } from "../features/crypto/cryptoSlice";

function formatNumber(num: number | null): string {
  if (num === null) return "—";
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toLocaleString()}`;
}

function formatSupply(num: number | null): string {
  if (num === null) return "—";
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toLocaleString();
}

const CryptoTable: React.FC = () => {
  const assets = useSelector((state: RootState) => state.crypto.assets);

  return (
    <div className="w-full overflow-x-auto mx-auto p-0 md:p-6 bg-transparent rounded-2xl">
      <table className="w-full border border-gray-300 border-collapse bg-transparent text-gray-800 text-sm min-w-[900px] rounded-lg shadow">
        <thead className="sticky top-0 z-10 bg-white/70 backdrop-blur-md">
          <tr>
            {[
              "#",
              "Logo",
              "Name",
              "Symbol",
              "Price",
              "1h %",
              "24h %",
              "7d %",
              "Market Cap",
              "24h Volume",
              "Circulating Supply",
              "Max Supply",
              "7D Chart",
            ].map((header) => (
              <th
                key={header}
                className="font-bold text-gray-700 uppercase tracking-wider py-3 px-2 text-left text-xs md:text-sm border border-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map((asset: Asset, idx: number) => (
            <tr
              key={asset.id}
              className="table-row-animate border-b border-gray-200 border border-gray-200 text-left hover:bg-yellow-50 hover:scale-[1.01] transition-all duration-200 rounded-xl shadow-sm group"
            >
              <td className="py-2 px-2 font-semibold text-gray-500 group-hover:text-yellow-600 transition-colors border border-gray-200">
                {idx + 1}
              </td>
              <td className="py-2 px-2 border border-gray-200">
                <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mx-auto shadow">
                  <img
                    src={asset.logo}
                    alt={asset.symbol}
                    className="w-5 h-5 rounded-full object-contain block"
                  />
                </span>
              </td>
              <td className="py-2 px-2 font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors border border-gray-200">
                {asset.name}
              </td>
              <td className="py-2 px-2 text-gray-500 border border-gray-200">
                {asset.symbol}
              </td>
              <td className="py-2 px-2 text-gray-900 font-mono border border-gray-200">
                $
                {asset.price.toLocaleString(undefined, {
                  maximumFractionDigits: 8,
                })}
              </td>
              <td
                className={`py-2 px-2 font-bold border border-gray-200 ${
                  asset.percentChange1h > 0
                    ? "text-green-500"
                    : asset.percentChange1h < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {asset.percentChange1h}%
              </td>
              <td
                className={`py-2 px-2 font-bold border border-gray-200 ${
                  asset.percentChange24h > 0
                    ? "text-green-500"
                    : asset.percentChange24h < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {asset.percentChange24h}%
              </td>
              <td
                className={`py-2 px-2 font-bold border border-gray-200 ${
                  asset.percentChange7d > 0
                    ? "text-green-500"
                    : asset.percentChange7d < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {asset.percentChange7d}%
              </td>
              <td className="py-2 px-2 text-gray-900 border border-gray-200">
                {formatNumber(asset.marketCap)}
              </td>
              <td className="py-2 px-2 text-gray-900 border border-gray-200">
                {formatNumber(asset.volume24h)}
              </td>
              <td className="py-2 px-2 text-gray-900 border border-gray-200">
                {formatSupply(asset.circulatingSupply)}
              </td>
              <td className="py-2 px-2 text-gray-900 border border-gray-200">
                {formatSupply(asset.maxSupply)}
              </td>
              <td className="py-2 px-2 border border-gray-200">
                <svg width="60" height="24" viewBox="0 0 60 24">
                  <polyline
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2"
                    points={asset.chart7d
                      .map((v, i, arr) => {
                        const min = Math.min(...arr);
                        const max = Math.max(...arr);
                        const y =
                          max === min
                            ? 12
                            : 20 - ((v - min) / (max - min)) * 16;
                        return `${i * 10},${y}`;
                      })
                      .join(" ")}
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
