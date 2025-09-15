import React,{useState} from 'react'

function LocationSearchPanel(props) {

  const {
    setPanelOpen,
    setVehiclePanel,
    suggestions = [],
    setSuggestions,
    activeInput,
    setDisplay,
    setPickup,
    setDestination,
  } = props
  
  const handleSuggestionClick = (displayName) => {
    if (activeInput === 'pickup') {
      setPickup(displayName)
    } else if (activeInput === 'destination') {
      setDestination(displayName)
    }
    setSuggestions([])
    //setPanelOpen(false)
    //setVehiclePanel(false)
  }

  return (
    <div className="w-full h-screen overflow-y-scroll scrollbar-hide mt-10">
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((elem, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-6 mb-4 border-2 border-transparent active:border-black rounded-md py-3 px-3"
            onClick={() => handleSuggestionClick(elem.display_name)}
          >
            <h2 className="bg-gray-200 flex items-center justify-center w-10 h-8 rounded-full px-2">
              {elem.addresstype === 'aeroway' ? (
                <i className="ri-plane-fill"></i>
              ) : elem.addresstype === 'railway' ? (
                <i className="ri-train-fill"></i>
              ) : (
                <i className="ri-map-pin-2-fill"></i>
              )}
            </h2>
            <h4 className="text-sm font-medium">{elem.display_name}</h4>
          </div>
        ))
      ) :(
        <p className="text-center text-gray-500 mt-10">"No suggestions found"</p>
      )}

      {/* extra space */}
      <div className="mb-4 w-full h-10"></div>
    </div>
  )
}

export default LocationSearchPanel
