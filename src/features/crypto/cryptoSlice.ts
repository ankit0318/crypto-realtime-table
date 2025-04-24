import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import btcLogo from "../../assets/btc.png";
import ethLogo from "../../assets/eth.png";
import usdtLogo from "../../assets/usdt.png";
import bnbLogo from "../../assets/bnb.png";
import solLogo from "../../assets/sol.png";

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chart7d: number[];
}

export interface CryptoState {
  assets: Asset[];
}

const initialState: CryptoState = {
  assets: [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      logo: btcLogo,
      price: 65000,
      percentChange1h: 0.5,
      percentChange24h: 2.1,
      percentChange7d: 5.3,
      marketCap: 1250000000000,
      volume24h: 35000000000,
      circulatingSupply: 19400000,
      maxSupply: 21000000,
      chart7d: [63000, 63500, 64000, 64500, 65000, 65500, 65000],
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      logo: ethLogo,
      price: 3200,
      percentChange1h: -0.2,
      percentChange24h: 1.5,
      percentChange7d: 3.8,
      marketCap: 380000000000,
      volume24h: 18000000000,
      circulatingSupply: 120000000,
      maxSupply: null,
      chart7d: [3100, 3120, 3150, 3180, 3200, 3250, 3200],
    },
    {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      logo: usdtLogo,
      price: 1.0,
      percentChange1h: 0.0,
      percentChange24h: 0.0,
      percentChange7d: 0.0,
      marketCap: 110000000000,
      volume24h: 45000000000,
      circulatingSupply: 110000000000,
      maxSupply: null,
      chart7d: [1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: "binancecoin",
      name: "BNB",
      symbol: "BNB",
      logo: bnbLogo,
      price: 600,
      percentChange1h: 0.1,
      percentChange24h: 0.8,
      percentChange7d: 2.2,
      marketCap: 90000000000,
      volume24h: 2500000000,
      circulatingSupply: 153000000,
      maxSupply: 200000000,
      chart7d: [580, 590, 595, 600, 610, 605, 600],
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      logo: solLogo,
      price: 150,
      percentChange1h: -0.3,
      percentChange24h: 2.9,
      percentChange7d: 7.1,
      marketCap: 67000000000,
      volume24h: 4000000000,
      circulatingSupply: 447000000,
      maxSupply: null,
      chart7d: [140, 142, 145, 148, 150, 155, 150],
    },
  ],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateAssets(state, action: PayloadAction<Asset[]>) {
      state.assets = action.payload;
    },
  },
});

export const { updateAssets } = cryptoSlice.actions;
export default cryptoSlice.reducer;
