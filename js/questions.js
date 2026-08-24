const QUESTIONS = [
  {
    id: 1,
    category: "Traffic Signs",
    text: "What does an eight-sided (octagon) red sign mean?",
    options: ["Yield the right-of-way", "Stop completely and proceed when safe", "Do not enter", "Speed limit ahead"],
    correctIndex: 1,
    explanation: "An eight-sided red sign always means STOP. You must make a full stop at the limit line, crosswalk, or intersection before proceeding."
  },
  {
    id: 2,
    category: "Traffic Signs",
    text: "A three-sided, downward-pointing red and white sign means:",
    options: ["Stop", "Do Not Enter", "Yield", "Wrong Way"],
    correctIndex: 2,
    explanation: "A downward-pointing triangle is a Yield sign. You must slow down and be ready to stop to let other traffic or pedestrians pass."
  },
  {
    id: 3,
    category: "Traffic Signs",
    text: "A yellow pennant-shaped sign on the left side of a two-way roadway indicates:",
    options: ["School crossing ahead", "No passing zone", "Railroad crossing ahead", "Right curve ahead"],
    correctIndex: 1,
    explanation: "A pennant-shaped (sideways triangle) yellow sign marks the beginning of a no passing zone."
  },
  {
    id: 4,
    category: "Traffic Signs",
    text: "What does a diamond-shaped yellow sign generally indicate?",
    options: ["Warning of a hazard ahead", "Regulatory speed limit", "School zone", "Rest area ahead"],
    correctIndex: 0,
    explanation: "Diamond-shaped yellow signs warn drivers of specific road conditions and dangers ahead."
  },
  {
    id: 5,
    category: "Traffic Signs",
    text: "A rectangular white sign with black text is a:",
    options: ["Warning sign", "Guide sign", "Regulatory sign", "Construction sign"],
    correctIndex: 2,
    explanation: "White rectangular signs indicate rules you must obey, such as speed limits and movement restrictions."
  },
  {
    id: 6,
    category: "Traffic Signs",
    text: "What color are highway guide signs indicating distances and directions?",
    options: ["Blue", "Green", "Brown", "Orange"],
    correctIndex: 1,
    explanation: "Green signs provide directional guidance and distance information to cities and specific routes."
  },
  {
    id: 7,
    category: "Traffic Signs",
    text: "Blue traffic signs generally indicate:",
    options: ["Tourist attractions", "Construction zones", "Motorist services", "Warning hazards"],
    correctIndex: 2,
    explanation: "Blue signs direct you to motorist services such as gas, food, lodging, and hospitals."
  },
  {
    id: 8,
    category: "Traffic Signs",
    text: "Brown traffic signs indicate:",
    options: ["State and national parks or recreational areas", "Hospital locations", "Highway exits", "Detours"],
    correctIndex: 0,
    explanation: "Brown signs point out recreational areas, parks, historical sites, and scenic routes."
  },
  {
    id: 9,
    category: "Traffic Signs",
    text: "Orange diamond-shaped signs are used to warn drivers of:",
    options: ["School zones", "Pedestrian crossings", "Highway construction and maintenance", "Slippery roads"],
    correctIndex: 2,
    explanation: "Orange signs are specifically used for construction and maintenance zones, indicating you should reduce speed and be alert."
  },
  {
    id: 10,
    category: "Traffic Signs",
    text: "A five-sided sign shaped like a pentagon indicates:",
    options: ["Railroad crossing", "School zone or school crossing", "No passing zone", "Yield right of way"],
    correctIndex: 1,
    explanation: "A five-sided, yellow-green or yellow sign indicates a school zone or school crossing."
  },
  {
    id: 11,
    category: "Traffic Signs",
    text: "A round yellow sign with a black 'X' and two 'R's means:",
    options: ["Road repair ahead", "Railroad crossing ahead", "Restricted lane ahead", "Roundabout ahead"],
    correctIndex: 1,
    explanation: "A round yellow sign warns that you are approaching a railroad crossing."
  },
  {
    id: 12,
    category: "Traffic Signs",
    text: "A sign showing a car with wavy lines behind it means:",
    options: ["Winding road ahead", "Slippery when wet", "Drunk driving check ahead", "Pavement ends"],
    correctIndex: 1,
    explanation: "This sign warns that the road surface becomes very slippery in wet weather, and you should slow down."
  },
  {
    id: 13,
    category: "Traffic Signs",
    text: "A sign with two arrows pointing in opposite directions with a divider at the top means:",
    options: ["Divided highway begins", "Divided highway ends", "Two-way traffic ahead", "Keep right of divider"],
    correctIndex: 1,
    explanation: "When the divider symbol is at the top (between the arrows), it means the divided highway is ending and two-way traffic begins."
  },
  {
    id: 14,
    category: "Traffic Signs",
    text: "A sign with a right-turning arrow and a red circle with a slash across it means:",
    options: ["No U-turn", "No left turn", "No right turn", "Right turn only"],
    correctIndex: 2,
    explanation: "The red circle with a slash indicates an action is prohibited. A right arrow inside means no right turn is allowed."
  },
  {
    id: 15,
    category: "Traffic Signs",
    text: "A yellow diamond sign showing an arrow bent to the right with a straight arrow next to it means:",
    options: ["Merge left", "Lane ends, merge right", "Lane ends, merge left", "Yield to traffic on left"],
    correctIndex: 2,
    explanation: "This sign indicates the right lane is ending and drivers must safely merge into the left lane."
  },
  {
    id: 16,
    category: "Traffic Signs",
    text: "What does a yellow sign with a cross (+) indicate?",
    options: ["Hospital ahead", "Railroad crossing", "Intersection/Crossroad ahead", "First aid station"],
    correctIndex: 2,
    explanation: "A cross symbol on a yellow diamond warns of an upcoming four-way intersection."
  },
  {
    id: 17,
    category: "Traffic Signs",
    text: "A white sign featuring a curved arrow curving around an obstacle means:",
    options: ["Keep right", "Detour ahead", "Roundabout", "Sharp curve"],
    correctIndex: 0,
    explanation: "This regulatory sign instructs drivers to keep to the right of a traffic island, median, or divider."
  },
  {
    id: 18,
    category: "Traffic Signs",
    text: "A yellow diamond sign with two arrows pointing in opposite directions means:",
    options: ["Yield to oncoming traffic", "Divided highway ahead", "Two-way traffic ahead", "One-way street ends"],
    correctIndex: 2,
    explanation: "This warns that you are leaving a separated one-way roadway and entering a two-way roadway."
  },
  {
    id: 19,
    category: "Traffic Signs",
    text: "What does a 'DO NOT ENTER' sign usually accompany?",
    options: ["Stop signs", "Yield signs", "Wrong Way signs", "Speed limit signs"],
    correctIndex: 2,
    explanation: "A 'DO NOT ENTER' sign is often posted alongside a 'WRONG WAY' sign on highway off-ramps and one-way streets."
  },
  {
    id: 20,
    category: "Traffic Signs",
    text: "A sign displaying a deer leaping means:",
    options: ["Zoo nearby", "Deer crossing area", "No hunting zone", "Park entrance"],
    correctIndex: 1,
    explanation: "This sign warns you to be alert for animals crossing the road, especially at dawn and dusk."
  },
  {
    id: 21,
    category: "Rules of the Road",
    text: "California's Basic Speed Law states that you must never drive faster than:",
    options: ["The posted speed limit", "65 mph", "Is safe for current conditions", "Traffic flow"],
    correctIndex: 2,
    explanation: "The Basic Speed Law dictates that your speed must be safe for the weather, visibility, traffic, and road conditions, regardless of the posted limit."
  },
  {
    id: 22,
    category: "Rules of the Road",
    text: "What is the speed limit in a school zone when children are present, unless otherwise posted?",
    options: ["15 mph", "25 mph", "35 mph", "20 mph"],
    correctIndex: 1,
    explanation: "The speed limit is 25 mph when driving within 500 to 1,000 feet of a school while children are outside or crossing the street."
  },
  {
    id: 23,
    category: "Rules of the Road",
    text: "What is the speed limit for a blind intersection (no stop signs, cannot see 100 feet in either direction)?",
    options: ["10 mph", "15 mph", "20 mph", "25 mph"],
    correctIndex: 1,
    explanation: "The speed limit for a blind intersection is 15 mph to ensure you have time to stop if a vehicle pulls out."
  },
  {
    id: 24,
    category: "Rules of the Road",
    text: "When approaching a railroad crossing without warning signals and you cannot see 400 feet down the tracks, the speed limit is:",
    options: ["15 mph", "25 mph", "30 mph", "35 mph"],
    correctIndex: 0,
    explanation: "If a railroad crossing is blind (you cannot see at least 400 feet in both directions), the speed limit is 15 mph."
  },
  {
    id: 25,
    category: "Rules of the Road",
    text: "You may legally pass a vehicle on the right when:",
    options: ["Driving on a single-lane road", "The vehicle is making a left turn and there is a paved lane to the right", "Driving on the unpaved shoulder", "You are in a carpool lane"],
    correctIndex: 1,
    explanation: "Passing on the right is permitted if the vehicle ahead is turning left and there is a marked, paved lane for you to safely pass without going off the road."
  },
  {
    id: 26,
    category: "Rules of the Road",
    text: "How far can you drive in a center left turn lane before making your turn?",
    options: ["50 feet", "100 feet", "200 feet", "300 feet"],
    correctIndex: 2,
    explanation: "You may only drive for a maximum of 200 feet in a center left turn lane before executing your turn."
  },
  {
    id: 27,
    category: "Rules of the Road",
    text: "You must signal continuously during the last ___ feet before making a turn.",
    options: ["50 feet", "100 feet", "150 feet", "200 feet"],
    correctIndex: 1,
    explanation: "California law requires you to signal your intention to turn for at least 100 feet before reaching the intersection."
  },
  {
    id: 28,
    category: "Rules of the Road",
    text: "When turning left from a one-way street onto a one-way street, you must start the turn from:",
    options: ["The rightmost lane", "Any lane", "The center lane", "The far left lane"],
    correctIndex: 3,
    explanation: "Left turns should always originate from the far left lane to avoid crossing paths with other vehicles."
  },
  {
    id: 29,
    category: "Rules of the Road",
    text: "When preparing to make a right turn, you may enter the bicycle lane no more than ___ feet before the corner.",
    options: ["50 feet", "100 feet", "200 feet", "300 feet"],
    correctIndex: 2,
    explanation: "You must enter the bicycle lane to make a right turn, but you cannot drive in it for more than 200 feet before the intersection."
  },
  {
    id: 30,
    category: "Rules of the Road",
    text: "Two solid yellow lines in the center of the roadway mean:",
    options: ["Passing is permitted from both directions", "Passing is strictly prohibited for both directions", "You may pass if it is safe", "Only traffic on the right can pass"],
    correctIndex: 1,
    explanation: "Solid double yellow lines indicate no passing is allowed for either direction of traffic, except to make a left turn into a driveway."
  },
  {
    id: 31,
    category: "Rules of the Road",
    text: "A broken yellow line alongside a solid yellow line means:",
    options: ["Passing is allowed only on the side with the broken line", "Passing is allowed only on the side with the solid line", "Passing is prohibited in both directions", "The lane is for turning only"],
    correctIndex: 0,
    explanation: "If the broken yellow line is on your side, you may pass. If the solid yellow line is on your side, you may not pass."
  },
  {
    id: 32,
    category: "Rules of the Road",
    text: "Solid white lines are used to:",
    options: ["Separate traffic moving in opposite directions", "Mark carpool lanes only", "Separate lanes of traffic moving in the same direction", "Indicate passing zones"],
    correctIndex: 2,
    explanation: "White lines separate lanes of traffic moving in the same direction. Solid white lines discourage lane changes."
  },
  {
    id: 33,
    category: "Rules of the Road",
    text: "What is the speed limit in a residential or business district unless otherwise posted?",
    options: ["20 mph", "25 mph", "30 mph", "35 mph"],
    correctIndex: 1,
    explanation: "The default speed limit in business and residential districts is 25 mph."
  },
  {
    id: 34,
    category: "Rules of the Road",
    text: "You must yield the right-of-way to a transit bus when:",
    options: ["It is dropping off passengers", "It is signaling to enter traffic from a stop", "It is driving slower than the speed limit", "It is changing lanes on the freeway"],
    correctIndex: 1,
    explanation: "California law requires drivers to yield to public transit buses that are signaling and re-entering traffic from a bus stop."
  },
  {
    id: 35,
    category: "Rules of the Road",
    text: "A diamond symbol painted on a lane indicates:",
    options: ["Bicycle lane", "High-Occupancy Vehicle (HOV) or carpool lane", "Toll lane", "Truck lane"],
    correctIndex: 1,
    explanation: "The diamond symbol marks lanes reserved for carpools, buses, motorcycles, or low-emission vehicles."
  },
  {
    id: 36,
    category: "Rules of the Road",
    text: "When entering a freeway on an on-ramp, you should be driving at:",
    options: ["The posted speed limit on the ramp", "55 mph", "A speed matching freeway traffic", "10 mph below freeway traffic"],
    correctIndex: 2,
    explanation: "You should use the on-ramp to accelerate and merge at a speed that matches the flow of freeway traffic safely."
  },
  {
    id: 37,
    category: "Rules of the Road",
    text: "When making a left turn on a green light without a green arrow, you must:",
    options: ["Yield to oncoming traffic and pedestrians", "Assume you have the right-of-way", "Wait for the light to turn yellow", "Stop and proceed when safe"],
    correctIndex: 0,
    explanation: "A solid green light means you can turn left, but you must first yield to oncoming vehicles and pedestrians in the crosswalk."
  },
  {
    id: 38,
    category: "Rules of the Road",
    text: "You can make a legal U-turn in a residential district if:",
    options: ["There are no vehicles approaching within 200 feet", "You honk your horn first", "You are at a crosswalk", "There is a double solid yellow line"],
    correctIndex: 0,
    explanation: "U-turns in residential districts are legal only when no other vehicles are approaching within 200 feet, or at an intersection protected by a stop sign or signal."
  },
  {
    id: 39,
    category: "Rules of the Road",
    text: "Is it legal to make a right turn on a solid red light?",
    options: ["No, never", "Yes, but only if a sign permits it", "Yes, after stopping and yielding to traffic and pedestrians, unless prohibited by a sign", "Yes, without stopping if the intersection is clear"],
    correctIndex: 2,
    explanation: "You may turn right on red in California after coming to a complete stop and yielding to all traffic and pedestrians, unless a 'No Turn on Red' sign is posted."
  },
  {
    id: 40,
    category: "Rules of the Road",
    text: "You are approaching an intersection. The traffic signal turns yellow. What should you do?",
    options: ["Speed up to clear the intersection", "Stop immediately, wherever you are", "Stop if you can do so safely; otherwise, cross carefully", "Honk your horn and proceed"],
    correctIndex: 2,
    explanation: "A solid yellow light means the signal will soon turn red. You must stop if it is safe to do so. If you cannot stop safely, proceed through the intersection cautiously."
  },
  {
    id: 41,
    category: "Safe Driving",
    text: "To avoid tailgating, you should follow the:",
    options: ["2-second rule", "3-second rule", "5-second rule", "1-car length rule"],
    correctIndex: 1,
    explanation: "The California DMV recommends the 3-second rule to maintain a safe following distance behind the vehicle ahead of you."
  },
  {
    id: 42,
    category: "Safe Driving",
    text: "When driving, you should scan the road ahead of you for:",
    options: ["3-5 seconds", "5-7 seconds", "10-15 seconds", "20-30 seconds"],
    correctIndex: 2,
    explanation: "Scanning 10-15 seconds ahead allows you to spot hazards early and gives you time to react."
  },
  {
    id: 43,
    category: "Safe Driving",
    text: "If your vehicle starts to hydroplane (ride on top of water), you should:",
    options: ["Brake hard", "Accelerate out of it", "Steer sharply to the side", "Take your foot off the gas and do not brake hard"],
    correctIndex: 3,
    explanation: "To recover from hydroplaning, ease off the accelerator and steer straight. Do not slam on the brakes, as this can cause a skid."
  },
  {
    id: 44,
    category: "Safe Driving",
    text: "When driving in dense fog, you should use your:",
    options: ["High beam headlights", "Low beam headlights", "Parking lights only", "Hazard lights"],
    correctIndex: 1,
    explanation: "Low beam headlights should be used in fog because high beams will reflect off the moisture in the air, creating glare and reducing visibility."
  },
  {
    id: 45,
    category: "Safe Driving",
    text: "You must dim your high beam headlights to low beams within ___ feet of an oncoming vehicle.",
    options: ["200 feet", "300 feet", "400 feet", "500 feet"],
    correctIndex: 3,
    explanation: "California law requires you to dim your high beams within 500 feet of an oncoming vehicle to avoid blinding the other driver."
  },
  {
    id: 46,
    category: "Safe Driving",
    text: "If weather conditions require you to use your windshield wipers, you must also:",
    options: ["Turn on your high beams", "Turn on your low beam headlights", "Turn on your hazard lights", "Drive half the speed limit"],
    correctIndex: 1,
    explanation: "If you need your windshield wipers due to rain, snow, or fog, state law requires you to also turn on your low beam headlights."
  },
  {
    id: 47,
    category: "Safe Driving",
    text: "For drivers 18 years of age and older, it is illegal to use a cell phone while driving UNLESS:",
    options: ["You are stopped at a red light", "It is hands-free", "You are holding it to use the GPS", "You are driving on a rural road"],
    correctIndex: 1,
    explanation: "Drivers over 18 may only use a cell phone if it is in hands-free mode. Drivers under 18 may not use a phone at all, even hands-free."
  },
  {
    id: 48,
    category: "Safe Driving",
    text: "Sending a text message while driving is:",
    options: ["Legal if you use one hand", "Legal if stopped at a light", "Illegal at all times", "Legal if you are over 21"],
    correctIndex: 2,
    explanation: "It is strictly illegal for any driver, regardless of age, to write, send, or read text messages while driving."
  },
  {
    id: 49,
    category: "Safe Driving",
    text: "It is illegal for a person 21 years of age or older to drive with a Blood Alcohol Concentration (BAC) of ___ or higher.",
    options: ["0.04%", "0.05%", "0.08%", "0.10%"],
    correctIndex: 2,
    explanation: "The legal BAC limit for drivers 21 and older in a non-commercial vehicle is 0.08%."
  },
  {
    id: 50,
    category: "Safe Driving",
    text: "If you are under 21 years of age, it is illegal to drive with a BAC of ___ or higher.",
    options: ["0.01%", "0.04%", "0.05%", "0.08%"],
    correctIndex: 0,
    explanation: "California has a 'Zero Tolerance' law for drivers under 21, making it illegal to drive with a BAC of 0.01% or higher."
  },
  {
    id: 51,
    category: "Safe Driving",
    text: "If you are driving a commercial vehicle, you can be cited for DUI if your BAC is ___ or higher.",
    options: ["0.01%", "0.04%", "0.08%", "0.10%"],
    correctIndex: 1,
    explanation: "Commercial drivers are held to a stricter standard, with the legal BAC limit being 0.04%."
  },
  {
    id: 52,
    category: "Safe Driving",
    text: "Under the Implied Consent Law, if you are arrested for DUI and refuse to take a blood or breath test, what will happen?",
    options: ["You will get a warning", "Your license will be suspended for at least one year", "You will pay a small fine", "Nothing, you have the right to refuse"],
    correctIndex: 1,
    explanation: "Refusing a chemical test after a DUI arrest automatically results in the suspension or revocation of your driving privilege for at least one year."
  },
  {
    id: 53,
    category: "Safe Driving",
    text: "Can you keep an opened container of alcohol in your vehicle?",
    options: ["Yes, anywhere", "Yes, as long as it's not being consumed", "No, unless it is kept in the trunk", "Yes, in the glove compartment"],
    correctIndex: 2,
    explanation: "Any opened alcoholic beverage container must be kept in the trunk of the vehicle, where the driver and passengers cannot access it."
  },
  {
    id: 54,
    category: "Safe Driving",
    text: "Is it legal to smoke in a vehicle when a minor (under 18) is present?",
    options: ["Yes, if the windows are down", "Yes, if they are your child", "No, it is illegal", "Yes, if the AC is on"],
    correctIndex: 2,
    explanation: "It is illegal to smoke in a motor vehicle at any time when a minor (under 18 years old) is inside."
  },
  {
    id: 55,
    category: "Safe Driving",
    text: "When changing lanes, the best way to check your blind spot is to:",
    options: ["Look in the rearview mirror", "Look in the side mirror", "Turn your head and look over your shoulder", "Listen for other vehicles"],
    correctIndex: 2,
    explanation: "Mirrors alone cannot show you the blind spot. You must physically turn your head and look over your shoulder before changing lanes."
  },
  {
    id: 56,
    category: "Safe Driving",
    text: "Wearing a seat belt in a moving vehicle is:",
    options: ["Optional for passengers in the back seat", "Required for all occupants by law", "Only required on freeways", "Required only for children"],
    correctIndex: 1,
    explanation: "California law mandates that the driver and all passengers, regardless of where they sit, must wear a seat belt."
  },
  {
    id: 57,
    category: "Safe Driving",
    text: "Children must be secured in a rear-facing child passenger restraint system until they are:",
    options: ["1 year old", "2 years old", "3 years old", "4 years old"],
    correctIndex: 1,
    explanation: "Children under 2 years of age must ride in a rear-facing car seat unless they weigh 40 or more pounds OR are 40 or more inches tall."
  },
  {
    id: 58,
    category: "Safe Driving",
    text: "A child under 8 years old may ride in the front seat if:",
    options: ["They ask to sit there", "They wear a seatbelt", "All rear seats are occupied by children under 7", "They have a doctor's note"],
    correctIndex: 2,
    explanation: "A child under 8 can sit in the front seat in a proper restraint only if there is no rear seat, rear seats are rear-facing jump seats, or all rear seats are filled with younger children."
  },
  {
    id: 59,
    category: "Safe Driving",
    text: "If you encounter an aggressive driver (road rage), you should:",
    options: ["Make eye contact", "Honk your horn at them", "Avoid eye contact and get out of their way", "Speed up to get away"],
    correctIndex: 2,
    explanation: "To safely handle road rage, ignore the aggressive driver, avoid making eye contact, and safely maneuver out of their way."
  },
  {
    id: 60,
    category: "Safe Driving",
    text: "When are roads most slippery?",
    options: ["During a heavy rainstorm", "After it has been raining for hours", "During the first rain after a dry spell", "When the road is hot"],
    correctIndex: 2,
    explanation: "Roads are slickest during the first few minutes of rain because oil and dirt on the road mix with the water to create a greasy surface."
  },
  {
    id: 61,
    category: "Parking",
    text: "A white painted curb means you may:",
    options: ["Park indefinitely", "Stop only to pick up or drop off passengers or mail", "Load or unload freight", "Park if you have a disabled placard"],
    correctIndex: 1,
    explanation: "A white curb allows very brief stopping only to drop off or pick up passengers, or to deposit mail in an adjacent mailbox."
  },
  {
    id: 62,
    category: "Parking",
    text: "A green painted curb means:",
    options: ["Unlimited parking", "No parking", "Parking for a limited time", "Loading zone only"],
    correctIndex: 2,
    explanation: "A green curb indicates a time-limited parking zone. Look for a posted sign or painted time limit on the curb."
  },
  {
    id: 63,
    category: "Parking",
    text: "A yellow painted curb is meant for:",
    options: ["Emergency vehicles only", "Loading or unloading passengers or freight", "Bus stops only", "School zones only"],
    correctIndex: 1,
    explanation: "Yellow curbs indicate a zone specifically designated for the loading and unloading of passengers or freight. Non-commercial vehicles must usually stay with the car."
  },
  {
    id: 64,
    category: "Parking",
    text: "What does a red painted curb indicate?",
    options: ["VIP parking", "Fire lane - no stopping, standing, or parking", "15-minute parking", "Reserved for residents"],
    correctIndex: 1,
    explanation: "A red curb means no stopping, standing, or parking at any time (buses may stop at red zones marked for buses)."
  },
  {
    id: 65,
    category: "Parking",
    text: "A blue painted curb means parking is reserved for:",
    options: ["Police vehicles", "Electric vehicles", "Persons with a disabled placard or license plate", "Taxis"],
    correctIndex: 2,
    explanation: "Blue curbs provide parking exclusively for individuals displaying valid disabled person placards or license plates."
  },
  {
    id: 66,
    category: "Parking",
    text: "When parking your vehicle facing downhill with a curb, you should point your front wheels:",
    options: ["Straight ahead", "Into the curb (toward the right)", "Away from the curb (toward the left)", "Parallel to the curb"],
    correctIndex: 1,
    explanation: "Turn your wheels toward the curb so that if the brakes fail, the vehicle will roll into the curb and stop, rather than rolling into traffic."
  },
  {
    id: 67,
    category: "Parking",
    text: "When parking facing uphill on a street with a curb, you must turn your front wheels:",
    options: ["Straight ahead", "Toward the curb (right)", "Away from the curb (left)", "Parallel to the street"],
    correctIndex: 2,
    explanation: "Turn your wheels away from the curb and let the vehicle roll back slightly so the rear of the front wheel rests against the curb, preventing it from rolling downhill."
  },
  {
    id: 68,
    category: "Parking",
    text: "When parking uphill or downhill on a road with NO curb, you should point your front wheels:",
    options: ["Toward the edge of the road (right)", "Away from the edge of the road (left)", "Straight ahead", "It does not matter"],
    correctIndex: 0,
    explanation: "With no curb, you want the car to roll off the road (into the dirt or shoulder) instead of into the center of the street if the brakes fail."
  },
  {
    id: 69,
    category: "Parking",
    text: "You may not park within ___ feet of a fire hydrant.",
    options: ["5 feet", "10 feet", "15 feet", "20 feet"],
    correctIndex: 2,
    explanation: "It is illegal to park within 15 feet of a fire hydrant or fire station driveway."
  },
  {
    id: 70,
    category: "Parking",
    text: "Is it legal to double park (park parallel to a car already parked at the curb)?",
    options: ["Yes, if you have your hazard lights on", "Yes, but only for 5 minutes", "No, it is strictly illegal", "Yes, if you stay in the car"],
    correctIndex: 2,
    explanation: "Double parking blocks traffic and creates a severe safety hazard; it is illegal under any circumstances."
  },
  {
    id: 71,
    category: "Parking",
    text: "When parallel parking, your vehicle's wheels must be within ___ of the curb.",
    options: ["12 inches", "18 inches", "24 inches", "36 inches"],
    correctIndex: 1,
    explanation: "When parked parallel to a curb, both the front and rear wheels must be within 18 inches of the curb."
  },
  {
    id: 72,
    category: "Parking",
    text: "Parking on a freeway is:",
    options: ["Legal if you pull entirely off the pavement", "Legal for sleeping", "Illegal unless it is an emergency or directed by police", "Legal near off-ramps"],
    correctIndex: 2,
    explanation: "You may only stop on a freeway in a true emergency, when a law enforcement officer requires it, or where specifically permitted."
  },
  {
    id: 73,
    category: "Parking",
    text: "It is illegal to leave a child aged ___ or younger unattended in a motor vehicle.",
    options: ["4 years old", "6 years old", "8 years old", "10 years old"],
    correctIndex: 1,
    explanation: "Children 6 years old or younger may not be left unattended in a vehicle. They must be supervised by a person at least 12 years old."
  },
  {
    id: 74,
    category: "Parking",
    text: "Is it legal to park your car on a sidewalk?",
    options: ["Yes, if the street is narrow", "Yes, if you partially park on the driveway", "No, it is never legal", "Yes, on weekends"],
    correctIndex: 2,
    explanation: "You may never park on or block a sidewalk. Pedestrians must have clear access at all times."
  },
  {
    id: 75,
    category: "Parking",
    text: "You must not park within ___ of a railroad track.",
    options: ["7.5 feet", "15 feet", "25 feet", "50 feet"],
    correctIndex: 0,
    explanation: "Parking on or within 7.5 feet of railroad tracks is illegal and highly dangerous."
  },
  {
    id: 76,
    category: "Parking",
    text: "If you borrow a disabled placard from a relative who is not with you, can you park in a blue space?",
    options: ["Yes, if you are running an errand for them", "No, it is illegal and punishable by a fine/jail time", "Yes, if it is for less than 10 minutes", "Yes, if you have their permission"],
    correctIndex: 1,
    explanation: "Placard abuse is a misdemeanor. The disabled person must be in the vehicle or being dropped off/picked up to use the placard."
  },
  {
    id: 77,
    category: "Parking",
    text: "Is it legal to leave a dog or cat inside a closed vehicle on a hot day?",
    options: ["Yes, if a window is cracked", "Yes, if parked in the shade", "No, it is illegal and dangerous", "Yes, for under 30 minutes"],
    correctIndex: 2,
    explanation: "It is illegal to leave an animal in a vehicle if conditions (like extreme heat or cold) threaten their health or life."
  },
  {
    id: 78,
    category: "Parking",
    text: "Can you park in front of a public or private driveway?",
    options: ["Yes, if it is your own driveway", "Yes, if you leave a note", "No, it is illegal", "Yes, for passenger loading only"],
    correctIndex: 2,
    explanation: "Blocking a driveway prevents access for others and is illegal. You may not park in front of any driveway, even your own."
  },
  {
    id: 79,
    category: "Parking",
    text: "When you leave your vehicle parked, you must:",
    options: ["Leave the engine running", "Leave the keys in the ignition", "Stop the engine, lock the ignition, and set the parking brake", "Leave the doors unlocked"],
    correctIndex: 2,
    explanation: "Always turn off the engine, set the parking brake, lock the vehicle, and take the keys with you when leaving a parked car."
  },
  {
    id: 80,
    category: "Parking",
    text: "A vehicle parked on a disabled parking space without a valid placard or plate may be:",
    options: ["Given a warning note", "Towed and fined", "Clamped", "Reported to the DMV"],
    correctIndex: 1,
    explanation: "Unauthorized parking in a disabled space will result in a heavy fine, and your vehicle may be towed at your expense."
  },
  {
    id: 81,
    category: "Right of Way",
    text: "At an intersection with no stop or yield signs (uncontrolled), who has the right-of-way?",
    options: ["The vehicle that arrives first", "The vehicle on the left", "The largest vehicle", "The vehicle going fastest"],
    correctIndex: 0,
    explanation: "At an uncontrolled intersection, you must yield to the vehicle that arrives first. If you arrive at the same time, yield to the vehicle on the right."
  },
  {
    id: 82,
    category: "Right of Way",
    text: "If two vehicles arrive at an uncontrolled intersection at the exact same time, who yields?",
    options: ["The vehicle on the right", "The vehicle on the left", "The vehicle going straight", "The vehicle turning"],
    correctIndex: 1,
    explanation: "When arriving simultaneously at a four-way stop or uncontrolled intersection, the driver on the left must yield to the driver on the right."
  },
  {
    id: 83,
    category: "Right of Way",
    text: "When approaching a 'T' intersection without signs or signals, who has the right-of-way?",
    options: ["Vehicles on the terminating street", "Vehicles on the through street", "Vehicles turning right", "Vehicles turning left"],
    correctIndex: 1,
    explanation: "At a 'T' intersection, traffic on the through street has the right-of-way. Vehicles on the road that ends must yield."
  },
  {
    id: 84,
    category: "Right of Way",
    text: "When making a left turn, you must yield the right-of-way to:",
    options: ["Vehicles behind you", "Vehicles turning right from your direction", "Oncoming vehicles going straight or turning right", "Cross traffic only"],
    correctIndex: 2,
    explanation: "A driver turning left must yield to oncoming traffic that is close enough to constitute a hazard."
  },
  {
    id: 85,
    category: "Right of Way",
    text: "You must yield the right-of-way to pedestrians:",
    options: ["Only in marked crosswalks", "Only at intersections with traffic lights", "At all times, even outside of crosswalks", "Only if they make eye contact"],
    correctIndex: 2,
    explanation: "Drivers must exercise due care for pedestrian safety and yield the right-of-way at all crosswalks, whether marked or unmarked."
  },
  {
    id: 86,
    category: "Right of Way",
    text: "When you hear a siren or see flashing red lights of an emergency vehicle, you must:",
    options: ["Speed up to clear the road", "Pull to the right edge of the road and stop", "Stop exactly where you are", "Pull into the nearest intersection"],
    correctIndex: 1,
    explanation: "You must yield the right-of-way to emergency vehicles by driving to the right edge of the road and stopping until they have passed."
  },
  {
    id: 87,
    category: "Right of Way",
    text: "If you are in an intersection when you hear an emergency vehicle siren, you should:",
    options: ["Stop in the intersection", "Back up out of the intersection", "Continue through the intersection, then pull to the right and stop", "Turn left immediately"],
    correctIndex: 2,
    explanation: "Never stop in the middle of an intersection. Proceed safely through, then immediately pull to the right and stop."
  },
  {
    id: 88,
    category: "Right of Way",
    text: "A pedestrian carrying a white cane or accompanied by a guide dog is crossing the street. You must:",
    options: ["Honk to let them know you are there", "Yield the right-of-way and stop", "Drive around them carefully", "Tell them when it is safe to cross"],
    correctIndex: 1,
    explanation: "You must completely stop and yield the right-of-way to blind or visually impaired pedestrians at all times."
  },
  {
    id: 89,
    category: "Right of Way",
    text: "When a school bus is stopped on your side of the road with its red lights flashing, you must:",
    options: ["Slow down to 15 mph and pass", "Stop until the red lights stop flashing", "Pass cautiously on the left", "Honk before passing"],
    correctIndex: 1,
    explanation: "Flashing red lights on a school bus indicate children are crossing. You must remain stopped until the lights stop flashing."
  },
  {
    id: 90,
    category: "Right of Way",
    text: "Do you have to stop for a school bus with flashing red lights if it is on the opposite side of a divided highway?",
    options: ["Yes, always", "No, the divider separates traffic", "Yes, but only if children are visible", "No, but you must slow down to 10 mph"],
    correctIndex: 1,
    explanation: "If there is a physical divider or a multilane highway (two or more lanes in each direction), traffic on the opposite side does not need to stop."
  },
  {
    id: 91,
    category: "Right of Way",
    text: "Who has the right-of-way in a roundabout?",
    options: ["Vehicles entering the roundabout", "Vehicles already circulating in the roundabout", "The largest vehicle", "Vehicles turning right"],
    correctIndex: 1,
    explanation: "Traffic entering a roundabout must yield to traffic already traveling within the circular roadway."
  },
  {
    id: 92,
    category: "Right of Way",
    text: "When two vehicles meet on a steep mountain road where neither can pass, which vehicle has the right-of-way?",
    options: ["The vehicle facing downhill", "The vehicle facing uphill", "The larger vehicle", "The vehicle going faster"],
    correctIndex: 1,
    explanation: "The vehicle facing downhill must yield and back up until the uphill-facing vehicle can safely pass, as backing up uphill is harder and more dangerous."
  },
  {
    id: 93,
    category: "Right of Way",
    text: "When re-entering traffic from a parked position at the curb, you must:",
    options: ["Sound your horn", "Wait for a gap in traffic and yield to moving vehicles", "Expect traffic to yield to you", "Enter quickly to avoid waiting"],
    correctIndex: 1,
    explanation: "Moving traffic has the right-of-way. You must signal, look over your shoulder, and yield until it is safe to merge."
  },
  {
    id: 94,
    category: "Right of Way",
    text: "If you want to turn right on a red light, you must first:",
    options: ["Slow down and yield", "Make a complete stop, then yield to pedestrians and traffic", "Turn only if a green arrow is showing", "Honk to warn others"],
    correctIndex: 1,
    explanation: "A right turn on red is permitted only after making a full stop and ensuring the way is clear of cross traffic and pedestrians."
  },
  {
    id: 95,
    category: "Right of Way",
    text: "If a pedestrian steps into the crosswalk, but the 'Don't Walk' signal is flashing, you should:",
    options: ["Honk at them to hurry up", "Drive around them", "Yield and wait for them to cross safely", "Edge forward to scare them"],
    correctIndex: 2,
    explanation: "Even if a pedestrian disobeys signals, you must yield to prevent an accident. Safety always comes first."
  },
  {
    id: 96,
    category: "Right of Way",
    text: "When crossing a sidewalk to enter a driveway or alley, who has the right-of-way?",
    options: ["The vehicle", "The pedestrians on the sidewalk", "Neither", "Whoever arrives first"],
    correctIndex: 1,
    explanation: "Drivers crossing a sidewalk to enter or exit a driveway must yield to pedestrians and bicyclists using the sidewalk."
  },
  {
    id: 97,
    category: "Right of Way",
    text: "Should you yield to bicyclists driving in the travel lane?",
    options: ["No, bicycles belong on the sidewalk", "Yes, they have the same rights and responsibilities as motor vehicles", "Only if they are in a bike lane", "No, they must yield to cars"],
    correctIndex: 1,
    explanation: "Bicyclists are legally permitted to share the road with motor vehicles and have the same right-of-way rules."
  },
  {
    id: 98,
    category: "Right of Way",
    text: "You are approaching an intersection with a green light, but traffic is blocking the intersection ahead. You should:",
    options: ["Enter the intersection and wait for it to clear", "Honk until they move", "Not enter the intersection until you can get completely across", "Change lanes in the intersection"],
    correctIndex: 2,
    explanation: "It is illegal to block an intersection. Do not enter unless there is enough space on the other side for your vehicle."
  },
  {
    id: 99,
    category: "Right of Way",
    text: "If a police officer is directing traffic at an intersection with working traffic lights, you should:",
    options: ["Obey the traffic lights", "Obey the police officer", "Treat it as a 4-way stop", "Turn around"],
    correctIndex: 1,
    explanation: "Instructions given by a police officer directing traffic override all posted signs or traffic signals."
  },
  {
    id: 100,
    category: "Right of Way",
    text: "When approaching a stationary emergency vehicle displaying flashing lights on a highway, you should:",
    options: ["Speed up to pass quickly", "Maintain your speed and stay in your lane", "Move over a lane if safe, or slow down", "Stop immediately"],
    correctIndex: 2,
    explanation: "The 'Move Over' law requires drivers to safely merge into a lane further away from the emergency vehicle, or slow down significantly if moving over isn't safe."
  },
  {
    id: 101,
    category: "Emergencies",
    text: "If your brakes suddenly fail while driving, the first thing you should do is:",
    options: ["Turn off the engine", "Pump the brake pedal rapidly", "Pull the parking brake sharply", "Shift into reverse"],
    correctIndex: 1,
    explanation: "Pumping the brakes can build up enough fluid pressure to stop the vehicle. If that fails, shift to a lower gear and apply the parking brake gently."
  },
  {
    id: 102,
    category: "Emergencies",
    text: "If a tire blows out while you are driving, you should:",
    options: ["Slam on the brakes immediately", "Grip the steering wheel firmly and take your foot off the gas", "Steer sharply onto the shoulder", "Accelerate to maintain control"],
    correctIndex: 1,
    explanation: "Do not brake hard during a blowout. Hold the steering wheel tightly, keep the car going straight, and let it slow down gradually."
  },
  {
    id: 103,
    category: "Emergencies",
    text: "What should you do if your gas pedal gets stuck?",
    options: ["Turn the ignition off immediately", "Shift into neutral and apply the brakes", "Reach down and try to pull it up", "Pump the brakes aggressively"],
    correctIndex: 1,
    explanation: "Shifting to neutral disengages the engine from the wheels. Apply the brakes, look for a safe place to pull over, and then turn off the engine."
  },
  {
    id: 104,
    category: "Emergencies",
    text: "If your vehicle begins to skid on a slippery road, you should:",
    options: ["Brake hard", "Steer in the opposite direction of the skid", "Take your foot off the gas and steer in the direction of the skid", "Accelerate slightly"],
    correctIndex: 2,
    explanation: "Ease off the gas pedal and steer into the skid (the direction the rear of the car is sliding) to regain traction."
  },
  {
    id: 105,
    category: "Emergencies",
    text: "If smoke comes from under your hood, indicating a fire, you should:",
    options: ["Open the hood to see the fire", "Pull off the road, turn off the engine, and exit the vehicle", "Drive to the nearest fire station", "Pour water on the engine"],
    correctIndex: 1,
    explanation: "Get the car off the road safely, shut off the ignition, and get yourself and passengers away from the vehicle. Do not open the hood, as oxygen feeds the fire."
  },
  {
    id: 106,
    category: "Emergencies",
    text: "If your engine begins to overheat while driving, a safe initial step is to:",
    options: ["Turn on the air conditioner", "Turn off the air conditioner and turn on the heater", "Stop and immediately remove the radiator cap", "Drive faster to increase airflow"],
    correctIndex: 1,
    explanation: "Turning on the heater pulls heat away from the engine block. Never remove the radiator cap while the engine is hot."
  },
  {
    id: 107,
    category: "Emergencies",
    text: "If your right wheels drop off the pavement onto a dirt shoulder, you should:",
    options: ["Jerk the wheel hard to the left", "Brake forcefully", "Take your foot off the gas, slow down, and steer back gently", "Accelerate and pull back onto the road"],
    correctIndex: 2,
    explanation: "Jerking the steering wheel can cause the car to flip or cross into oncoming traffic. Slow down first, then gently ease back onto the pavement."
  },
  {
    id: 108,
    category: "Emergencies",
    text: "If your headlights fail suddenly at night, you should:",
    options: ["Continue driving slowly", "Try the turn signals or hazard lights and pull off the road safely", "Follow the car ahead of you closely", "Turn on your interior dome light"],
    correctIndex: 1,
    explanation: "If headlights fail, try the dimmer switch or parking/hazard lights to give yourself enough visibility to safely pull completely off the roadway."
  },
  {
    id: 109,
    category: "Emergencies",
    text: "If your hood flies up suddenly while driving, you should:",
    options: ["Look through the gap under the hood or out the side window, and pull over", "Brake as hard as possible", "Turn on your high beams", "Keep driving normally"],
    correctIndex: 0,
    explanation: "Maintain control of your vehicle by looking under the gap of the hood or out the window, activate your hazard lights, and pull over safely."
  },
  {
    id: 110,
    category: "Emergencies",
    text: "If a wild animal suddenly runs into the road in front of you, the safest action is usually to:",
    options: ["Swerve aggressively to avoid it", "Brake firmly without swerving out of your lane", "Honk and accelerate", "Flash your high beams repeatedly"],
    correctIndex: 1,
    explanation: "Swerving can cause you to lose control, roll over, or hit another vehicle. It is generally safer to brake in a straight line, even if it means hitting the animal."
  },
  {
    id: 111,
    category: "Emergencies",
    text: "If you are involved in a collision, the first thing you must do is:",
    options: ["Call your insurance company", "Stop your vehicle at or near the scene", "Check for damage to your car", "Drive to the police station"],
    correctIndex: 1,
    explanation: "Leaving the scene of an accident is illegal (hit-and-run). You must stop immediately and safely."
  },
  {
    id: 112,
    category: "Emergencies",
    text: "If you hit a parked car and cannot find the owner, you must:",
    options: ["Leave quickly", "Wait for the owner to return", "Leave a note with your contact info and notify police", "Take a picture and go home"],
    correctIndex: 2,
    explanation: "You must leave a secure note containing your name, contact information, and address, and promptly report the collision to the local police or CHP."
  },
  {
    id: 113,
    category: "Emergencies",
    text: "You must report an accident to the DMV within 10 days if:",
    options: ["You hit an animal", "Property damage exceeds $1,000 or anyone is injured/killed", "You get a flat tire", "Another driver yells at you"],
    correctIndex: 1,
    explanation: "California law mandates filing an SR-1 form with the DMV if a collision results in death, injury, or property damage over $1,000."
  },
  {
    id: 114,
    category: "Emergencies",
    text: "Fleeing or attempting to evade law enforcement is a:",
    options: ["Minor traffic infraction", "Misdemeanor punishable by up to 1 year in jail", "Legal right if you are scared", "Warning violation"],
    correctIndex: 1,
    explanation: "Evading police is a serious misdemeanor. If it results in bodily injury, it becomes a felony with severe state prison time."
  },
  {
    id: 115,
    category: "Emergencies",
    text: "If your vehicle breaks down on the freeway, you should:",
    options: ["Stand in the lane to wave down help", "Pull to the right shoulder, turn on hazards, and stay in the vehicle with seatbelts on", "Try to repair it in the middle lane", "Walk along the freeway to a gas station"],
    correctIndex: 1,
    explanation: "Walking on the freeway is extremely dangerous. Stay inside your locked vehicle with your seatbelt on until professional help arrives."
  },
  {
    id: 116,
    category: "Emergencies",
    text: "If your vehicle plunges into water, you should immediately:",
    options: ["Wait for the car to hit the bottom", "Try to open the door", "Unbuckle, roll down a window, and escape", "Call 911 from inside the car"],
    correctIndex: 2,
    explanation: "Water pressure will quickly make doors impossible to open. Roll down the window immediately and escape before the vehicle fully submerges."
  },
  {
    id: 117,
    category: "Emergencies",
    text: "To prevent carbon monoxide poisoning, you should:",
    options: ["Never run the engine in an enclosed space like a closed garage", "Always drive with the windows down", "Use a higher grade of gasoline", "Turn off the radio"],
    correctIndex: 0,
    explanation: "Carbon monoxide is an odorless, deadly gas in exhaust. Never leave a vehicle running in a closed garage or space with poor ventilation."
  },
  {
    id: 118,
    category: "Emergencies",
    text: "If an earthquake occurs while you are driving, you should:",
    options: ["Speed up to outrun it", "Pull over safely away from bridges, overpasses, and power lines", "Stop directly under an overpass for protection", "Abandon your car"],
    correctIndex: 1,
    explanation: "Find a clear area away from structures that could collapse on your vehicle. Stop and stay inside your car until the shaking stops."
  },
  {
    id: 119,
    category: "Emergencies",
    text: "If you carry emergency flares or warning triangles, where should you place them if you break down?",
    options: ["10 feet behind your car", "On the roof of your car", "200-300 feet behind your vehicle", "Directly in front of your vehicle"],
    correctIndex: 2,
    explanation: "Placing warning devices 200 to 300 feet behind your vehicle gives approaching drivers enough advance warning to change lanes safely."
  },
  {
    id: 120,
    category: "Emergencies",
    text: "Under the Good Samaritan Law, if you help someone injured in a crash:",
    options: ["You will be paid for your help", "You are generally protected from civil liability if you act in good faith", "You assume full medical responsibility for them", "You can be sued if they do not survive"],
    correctIndex: 1,
    explanation: "Good Samaritan laws protect ordinary citizens who provide emergency assistance in good faith from being sued for unintentional injury or wrongful death."
  }
];
