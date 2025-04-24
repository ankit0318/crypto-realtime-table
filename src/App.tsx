import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssets } from "./features/crypto/cryptoSlice";
import CryptoTable from "./components/CryptoTable";
import { RootState } from "./store";

function getRandomFloat(min: number, max: number, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mutateAsset(asset: any) {
  // Simulate price change
  const priceChange = getRandomFloat(-0.5, 0.5, 4) * asset.price * 0.01;
  const newPrice = Math.max(asset.price + priceChange, 0.0001);
  // Simulate percent changes
  const percentChange1h = getRandomFloat(-1, 1, 2);
  const percentChange24h = getRandomFloat(-3, 3, 2);
  const percentChange7d = getRandomFloat(-7, 7, 2);
  // Simulate volume
  const volumeChange = getRandomInt(-1000000, 1000000);
  const newVolume = Math.max(asset.volume24h + volumeChange, 0);
  // Mutate chart7d (shift left, add new price)
  const newChart7d = [...asset.chart7d.slice(1), newPrice];
  return {
    ...asset,
    price: parseFloat(newPrice.toFixed(8)),
    percentChange1h,
    percentChange24h,
    percentChange7d,
    volume24h: newVolume,
    chart7d: newChart7d,
  };
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.crypto.assets);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = assets.map(mutateAsset);
      dispatch(updateAssets(updated));
    }, getRandomInt(1000, 2000));
    return () => clearInterval(interval);
  }, [assets, dispatch]);

  return (
    <div className="crypto-tracker-animate min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#f1f5f9] px-4 py-12">
      <div className="w-full max-w-6xl mx-auto rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-gray-200 p-8 md:p-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-500 mb-10 drop-shadow-lg tracking-tight text-center uppercase">
          Crypto Tracker
        </h1>
        <CryptoTable />
      </div>
    </div>
  );
};

export default App;
