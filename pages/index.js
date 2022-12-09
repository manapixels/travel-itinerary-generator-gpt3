import { useState, memo } from 'react'
import Image from 'next/image'
import buildspaceLogo from '../assets/buildspace-logo.png'
import { countryList } from '../assets/countryList'
import {
   IconCircleNumber1,
   IconCircleNumber2,
   IconCircleNumber3,
   IconCircleNumber4,
} from '@tabler/icons'

const popularCountries = ['Japan', 'Italy', 'France', 'Spain', 'Thailand']
const months = ['Any month', 'January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const basePrompt = "Write me an itinerary for"
const addHotelsPrompt = ", best hotels to stay in based on proximity to attractions"
const addRestaurantsPrompt = ", two good local restaurants per day that locals love (I don't need the address, but I want the shortened Google map links, as well as the restaurant names in local language). "

const Home = () => {
   const [duration, setDuration] = useState(7)
   const [hotels, setHotels] = useState(true)
   const [restaurants, setRestaurants] = useState(true)
   const [selectedCountry, setSelectedCountry] = useState('')
   const [selectedMonth, setSelectedMonth] = useState('Any month')

   const [apiOutput, setApiOutput] = useState('')
   const [isGenerating, setIsGenerating] = useState(false)

   const callGenerateEndpoint = async () => {
      setIsGenerating(true)

      let prompt = `${basePrompt} ${duration} days to ${selectedCountry} in the coming ${selectedMonth}, in Paul Graham style. Give me a summary of the weather in that month and 5 things to take note about this country's culture. This itinerary should include which attractions are worth visiting, underrated attractions`
      if (hotels) prompt += addHotelsPrompt
      if (restaurants) prompt += addRestaurantsPrompt
      prompt += 'The itinerary should not be rushed. Show the fastest transport modes between destinations and their prices.\n'

      console.log('Calling OpenAI with prompt...')
      console.log(prompt)

      const response = await fetch('/api/generate', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      const { output } = data
      console.log('OpenAI replied...', output.text)

      setApiOutput(`${output.text}`)
      setIsGenerating(false)
   }

   return (
      <div className="root">
         <div className="flex w-full">
            <div className="container-left">
               <div className="header">
                  <div className="header-title">
                     <h1>Travel Itinerary Generator 🪄</h1>
                  </div>
                  <div className="header-subtitle">
                     <h2>
                        Give me some details and I'll 🪄 an itinerary just for
                        you!
                     </h2>
                  </div>
               </div>
               <div className="prompt-container">
                  <div className="flex items-center">
                     <IconCircleNumber1 color="rgb(110 231 183)" />
                     <span className="ml-2">Where do you want to go?</span>
                  </div>
                  {/* <input
                  type="text"
                  placeholder="A country you are interested in visiting"
                  className="prompt-box"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
               /> */}
                  <select
                     value={selectedCountry}
                     onChange={(e) => setSelectedCountry(e.target.value)}
                     className="prompt-box"
                  >
                     <option value="">Select a country</option>
                     {countryList.map((country) => (
                        <option key={country} value={country}>
                           {country}
                        </option>
                     ))}
                  </select>
                  <div className="areas-of-interests">
                     <div
                        style={{
                           color: '#fff',
                           display: 'inline-block',
                           marginRight: '.8rem',
                        }}
                     ></div>
                     {popularCountries.map((i) => (
                        <button
                           className={`item ${selectedCountry.includes(i) && 'selected'}`}
                           key={i}
                           onClick={() => {
                              setSelectedCountry(i)
                           }}
                        >
                           {i}
                        </button>
                     ))}
                  </div>
                  <div className="flex w-100 mt-4">
                     <div
                        className="flex-none mr-6 flex-col items-start"
                        style={{ display: 'flex', width: '180px' }}
                     >
                        <div className="flex items-center mb-2">
                           <IconCircleNumber2 color="rgb(110 231 183)" />
                           <span className="ml-2">How many days?</span>
                        </div>
                        <input
                           type="number"
                           className="rounded block"
                           value={duration}
                           onChange={(e) => setDuration(e.target.value)}
                           style={{ width: '180px' }}
                        />
                     </div>
                     <div className="ml-4">
                     <div className="flex items-center mb-2">
                           <IconCircleNumber3 color="rgb(110 231 183)" />
                           <span className="ml-2">Month</span>
                        </div>
                     <select
                     value={selectedMonth}
                     onChange={(e) => setSelectedMonth(e.target.value)}
                     className="prompt-box"
                  >
                     <option value="">Select a month</option>
                     {months.map((m) => (
                        <option key={m} value={m}>
                           {m}
                        </option>
                     ))}
                  </select>
                  </div>
                  </div>
                  <div className="mt-4">
                     <div>
                        <div className="flex items-center mb-2">
                           <IconCircleNumber4 color="rgb(110 231 183)" />
                           <span className="ml-2">Recommendations?</span>
                        </div>
                        <div>
                           <label className="inline-flex items-center mr-8">
                              <input
                                 type="checkbox"
                                 className="rounded checked:bg-blue-500"
                                 value={restaurants}
                                 checked={restaurants}
                                 onChange={(e) =>
                                  setRestaurants(e.target.checked)
                               }
                              />
                              <span className="ml-2">🍔 Restaurants</span>
                           </label>

                           <label className="inline-flex items-center">
                              <input
                                 type="checkbox"
                                 className="rounded checked:bg-blue-500"
                                 value={hotels}
                                 onChange={(e) => setHotels(e.target.checked)}
                                 checked={hotels}
                              />
                              <span className="ml-2">🏨 Hotels</span>
                           </label>
                        </div>
                     </div>
                  </div>
                  <div className="prompt-buttons">
                     <button
                        className="pushable py-2 px-4 rounded"
                        onClick={callGenerateEndpoint}
                        disabled={isGenerating}
                     >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <div className="front">
                           {isGenerating ? (
                              <span className="loader"></span>
                           ) : (
                              <span className="font-semibold">Generate</span>
                           )}
                        </div>
                     </button>
                  </div>
               </div>
            </div>
            <div className="container-right">
               {apiOutput && (
                  <div className="output">
                     <div className="output-header-container">
                        <div className="output-header">
                           <h3>Your Unique Itinerary</h3>
                        </div>
                     </div>
                     <div className="output-content">
                        <p>{apiOutput}</p>
                     </div>
                  </div>
               )}
            </div>
         </div>
         <div className="badge-container grow">
            <a
               href="https://buildspace.so/builds/ai-writer"
               target="_blank"
               rel="noreferrer"
            >
               <div className="badge">
                  <Image
                     src={buildspaceLogo}
                     alt="buildspace logo"
                     style={{ opacity: '0.5' }}
                  />
                  <p>build with buildspace</p>
               </div>
            </a>
         </div>
      </div>
   )
}

export default Home
