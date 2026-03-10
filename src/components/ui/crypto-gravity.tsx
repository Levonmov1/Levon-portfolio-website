"use client";

import { Gravity, MatterBody } from "@/components/ui/gravity";

const COINS = [
  { name: "Bitcoin", src: "/images/crypto/Bitcoin.png", x: "20%", y: "5%" },
  { name: "Ethereum", src: "/images/crypto/Ethereum.png", x: "45%", y: "10%" },
  { name: "Solana", src: "/images/crypto/Solana.png", x: "70%", y: "5%" },
  { name: "XRP", src: "/images/crypto/XRP.png", x: "35%", y: "15%" },
  { name: "Cardano", src: "/images/crypto/Cardano.png", x: "85%", y: "10%" },
  { name: "Dogecoin", src: "/images/crypto/Dogecoin.png", x: "55%", y: "8%" },
  { name: "BNB", src: "/images/crypto/BNB.png", x: "15%", y: "12%" },
  { name: "Litecoin", src: "/images/crypto/Litecoin.png", x: "75%", y: "15%" },
  { name: "Polygon", src: "/images/crypto/Polygon.png", x: "30%", y: "3%" },
  { name: "Tether", src: "/images/crypto/Theter.png", x: "60%", y: "12%" },
  { name: "Chainlink", src: "/images/crypto/Chainlink.png", x: "25%", y: "8%" },
  { name: "Dash", src: "/images/crypto/Dash.png", x: "50%", y: "3%" },
  { name: "Shiba Inu", src: "/images/crypto/Shiba Inu.png", x: "80%", y: "7%" },
  { name: "Stellar", src: "/images/crypto/Stellar.png", x: "40%", y: "13%" },
  { name: "Terra", src: "/images/crypto/Terra.png", x: "65%", y: "6%" },
  { name: "Tron", src: "/images/crypto/Tron.png", x: "10%", y: "10%" },
];

const bodyOptions = {
  friction: 0.5,
  restitution: 0.3,
  density: 0.002,
};

export default function CryptoGravity() {
  return (
    <Gravity
      gravity={{ x: 0, y: 1 }}
      grabCursor
      resetOnResize
      addTopWall={false}
      className="w-full h-full"
    >
      {COINS.map((coin, i) => (
        <MatterBody
          key={coin.name}
          matterBodyOptions={bodyOptions}
          bodyType="circle"
          x={coin.x}
          y={coin.y}
          angle={i * 15}
        >
          <div className="w-28 h-28 rounded-full overflow-hidden select-none">
            <img
              src={coin.src}
              alt={coin.name}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </MatterBody>
      ))}
    </Gravity>
  );
}
