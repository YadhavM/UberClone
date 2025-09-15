import React,{useEffect,useRef} from 'react'
import { useDrag } from "@use-gesture/react";
import gsap from 'gsap'

const VehiclePanel = (props) => {
    const vehiclePanelRef = useRef(null)
    const {fare,setConfirmRidePanel,setVehicleImage} = props
    

      const UberGoImage =
    "https://imgs.search.brave.com/TKzcq4TXbGqQUdpiEcg9FgywtpYVK37LZka0tX-8t24/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjkv/OTQ2LzIwMS9zbWFs/bC93aGl0ZS1tb2Rl/cm4tY2FyLWlzb2xh/dGVkLW9uLXRyYW5z/cGFyZW50LWJhY2tn/cm91bmQtM2QtcmVu/ZGVyaW5nLWlsbHVz/dHJhdGlvbi1mcmVl/LXBuZy5wbmc";
  const UberMotoImage =
    "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/96091ab3-c266-472a-99b5-b78dda3b50cd.png";
  const UberVanImage =
    "https://imgs.search.brave.com/_sATx4OPlO8FBP2PUr5GsBo2PT7V9J3-JMMe7eTQhBI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NTk1LzE4NS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n";
  const UberAutoImage =
    "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/474bbf7d-56af-4649-9f19-cfadc1a2e696.png";

    const bind = useDrag(
        ({ movement: [, my], last }) => {
          const targetRef = vehiclePanelRef; // 👈 use correct ref
    
          if (targetRef?.current) {
            const clampedY = Math.max(0, my);
    
            if (!last) {
              gsap.set(targetRef.current, { y: clampedY });
            } else {
              if (clampedY > 80) {
                gsap.to(targetRef.current, {
                  y: "100%",
                  duration: 0.3,
                  ease: "power2.out",
                  onComplete: () => {
                    if (vehiclePanel) {
                      setVehiclePanel(false);
                    }
                  },
                });
              } else {
                gsap.to(targetRef.current, {
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            }
          }
        },
        { axis: "y" }
      );

  return (
    <div>
      
          <div className="touch-none" {...bind()}>
            <div
              className="line2 absolute w-10 top-1/50 h-1 bg-gray-300 left-[43%] rounded-sm touch-none"
              {...bind()}
            ></div>

            <h3 className="text-2xl font-semibold mb-3 mt-2">Choose a vehicle</h3>
          </div>

          {/* vehicle options... (kept as you had them) */}
          <div
            className="flex flex-row border-2 border-transparent active:border-black rounded-md"
            onClick={() => {
              setVehicleImage(UberGoImage);
              setConfirmRidePanel(true);
              props.setVehicleType('car')
            }}
          >
            <div className="w-15 flex items-center justify-center">
              <img className="w-15" src={UberGoImage} alt="" />
            </div>
            <div className="flex flex-col py-3 w-50 pl-10" onClic>
              <h4 className="text-lg font-medium">
                UberGo
                <span className="text-base ml-2">
                  <i className="ri-user-3-fill"></i>4
                </span>
              </h4>
              <h5 className="text-sm font-sans">2 mins away</h5>
              <p className="text-sm ">Affordable, compact rides</p>
            </div>
            <div className="px-4 py-6">
              <h3 className="text-lg font-bold">${fare.fare?.car ?? '--'}</h3>
            </div>
          </div>

          <div
            className="flex flex-row border-2 border-transparent active:border-black  rounded-md"
            onClick={() => {
              setVehicleImage(UberMotoImage);
              setConfirmRidePanel(true);
              props.setVehicleType('motorcycle')
            }}
          >
            <div className="w-15 flex items-center justify-center">
              <img className="w-10" src={UberMotoImage} alt="" />
            </div>
            <div className="flex flex-col py-3 pl-10 w-50">
              <h4 className="text-lg font-medium">
                Moto
                <span className="text-base ml-2">
                  <i className="ri-user-3-fill"></i>1
                </span>
              </h4>
              <h5 className="text-sm font-sans">5 mins away</h5>
              <p className="text-sm ">Affordable motorcycle rides</p>
            </div>
            <div className="px-4 py-6">
              <h3 className="text-lg font-bold">${fare.fare?.motorcycle ?? '--'}</h3>
            </div>
          </div>

          <div
            className="flex flex-row border-2 border-transparent active:border-black  rounded-md"
            onClick={() => {
              setVehicleImage(UberVanImage);
              setConfirmRidePanel(true);
              props.setVehicleType('premium')
            }}
          >
            <div className="w-15 flex items-center justify-center">
              <img className="w-15 scale-[1.3]" src={UberVanImage} alt="" />
            </div>
            <div className="flex flex-col py-3 pl-10 w-50">
              <h4 className="text-lg font-medium">
                UberPremium
                <span className="text-base ml-2">
                  <i className="ri-user-3-fill"></i>5
                </span>
              </h4>
              <h5 className="text-sm font-sans">5 mins away</h5>
              <p className="text-sm ">Premium , comfort rides</p>
            </div>
            <div className="px-4 py-6">
              <h3 className="text-lg font-bold">${fare.fare?.premium ?? '--'}</h3>
            </div>
          </div>

          <div
            className="flex flex-row mt-2 border-2 border-transparent active:border-black rounded-md"
            onClick={() => {
              setVehicleImage(UberAutoImage);
              setConfirmRidePanel(true);
              props.setVehicleType('auto')
            }}
          >
            <div className="w-15 flex items-center justify-center">
              <img className="w-10" src={UberAutoImage} alt="" />
            </div>
            <div className="flex flex-col py-3 pl-10 w-50">
              <h4 className="text-lg font-medium">
                UberAuto
                <span className="text-base ml-2">
                  <i className="ri-user-3-fill"></i>3
                </span>
              </h4>
              <h5 className="text-sm font-sans">5 mins away</h5>
            </div>
            <div className="px-4 py-6">
              <h3 className="text-lg font-bold">${fare.fare?.auto?? '--'}</h3>
            </div>
          </div>

          {/* Additional Space */}
          <div className="flex flex-row mt-2 border-2 border-transparent active:border-black rounded-md">
            <div className="w-15 flex items-center justify-center"></div>
            <div className="flex flex-col py-3 pl-10 w-50"></div>
            <div className="px-4 py-6"></div>
          </div>
    </div>
  )
}

export default VehiclePanel
