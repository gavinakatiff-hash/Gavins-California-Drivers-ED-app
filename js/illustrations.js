// SVG Illustration Generator for all 120 CA DMV Questions
const Illustrations = {
    get(question) {
        if (!question) return '';
        const id = question.id;
        const cat = question.category;
        
        // Generate tailored SVGs based on question ID
        switch (id) {
            // --- TRAFFIC SIGNS (1-20) ---
            case 1: // Octagon Stop Sign
                return this.svgSign(`<polygon points="75,20 125,20 160,55 160,105 125,140 75,140 40,105 40,55" fill="#D32F2F" stroke="#FFFFFF" stroke-width="4"/><text x="100" y="88" fill="#FFFFFF" font-size="26" font-weight="900" text-anchor="middle" font-family="Arial, sans-serif">STOP</text>`, "Red Octagon = Complete Stop Required");
            case 2: // Yield Sign
                return this.svgSign(`<polygon points="40,30 160,30 100,135" fill="#D32F2F"/><polygon points="56,40 144,40 100,118" fill="#FFFFFF"/><text x="100" y="65" fill="#D32F2F" font-size="18" font-weight="900" text-anchor="middle" font-family="Arial, sans-serif">YIELD</text>`, "Downward Triangle = Yield Right-of-Way");
            case 3: // Pennant No Passing Zone
                return this.svgSign(`<polygon points="40,30 160,80 40,130" fill="#FBC02D" stroke="#000" stroke-width="3"/><text x="75" y="70" fill="#000" font-size="11" font-weight="800" text-anchor="middle">NO</text><text x="75" y="85" fill="#000" font-size="11" font-weight="800" text-anchor="middle">PASSING</text><text x="75" y="100" fill="#000" font-size="11" font-weight="800" text-anchor="middle">ZONE</text>`, "Pennant (Left Side) = No Passing Zone");
            case 4: // Diamond Warning
                return this.svgSign(`<g transform="rotate(45 100 80)"><rect x="55" y="35" width="90" height="90" fill="#FBC02D" stroke="#000" stroke-width="3" rx="4"/></g><text x="100" y="75" font-size="28" text-anchor="middle">⚠️</text><text x="100" y="100" fill="#000" font-size="10" font-weight="800" text-anchor="middle">WARNING</text>`, "Yellow Diamond = Road Hazard Warning");
            case 5: // White Regulatory Sign
                return this.svgSign(`<rect x="60" y="20" width="80" height="110" fill="#FFFFFF" stroke="#000000" stroke-width="3" rx="4"/><text x="100" y="45" fill="#000" font-size="10" font-weight="800" text-anchor="middle">SPEED</text><text x="100" y="60" fill="#000" font-size="10" font-weight="800" text-anchor="middle">LIMIT</text><text x="100" y="105" fill="#000" font-size="36" font-weight="900" text-anchor="middle">65</text>`, "White Rectangle = Regulatory Traffic Law");
            case 6: // Green Guide Sign
                return this.svgSign(`<rect x="35" y="35" width="130" height="85" fill="#1B8A46" stroke="#FFFFFF" stroke-width="3" rx="6"/><text x="100" y="62" fill="#FFFFFF" font-size="13" font-weight="800" text-anchor="middle">Los Angeles</text><text x="100" y="82" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">EXIT 24B</text><path d="M90,105 L100,92 L110,105" fill="none" stroke="#FFFFFF" stroke-width="3"/>`, "Green Sign = Direction & Highway Guide");
            case 7: // Blue Services Sign
                return this.svgSign(`<rect x="50" y="25" width="100" height="100" fill="#1565C0" stroke="#FFFFFF" stroke-width="3" rx="6"/><text x="100" y="55" font-size="22" text-anchor="middle">⛽ 🏥</text><text x="100" y="85" fill="#FFFFFF" font-size="11" font-weight="800" text-anchor="middle">SERVICES</text><text x="100" y="105" fill="#FFFFFF" font-size="9" font-weight="700" text-anchor="middle">NEXT RIGHT</text>`, "Blue Sign = Motorist Services (Gas/Hospital)");
            case 8: // Brown Recreation Sign
                return this.svgSign(`<rect x="50" y="25" width="100" height="100" fill="#5D4037" stroke="#FFFFFF" stroke-width="3" rx="6"/><text x="100" y="60" font-size="24" text-anchor="middle">🌲 ⛺</text><text x="100" y="90" fill="#FFFFFF" font-size="11" font-weight="800" text-anchor="middle">STATE PARK</text>`, "Brown Sign = Parks & Recreation Areas");
            case 9: // Orange Construction Sign
                return this.svgSign(`<g transform="rotate(45 100 80)"><rect x="55" y="35" width="90" height="90" fill="#FF6D00" stroke="#000" stroke-width="3" rx="4"/></g><text x="100" y="72" font-size="22" text-anchor="middle">🚧</text><text x="100" y="95" fill="#000" font-size="9" font-weight="800" text-anchor="middle">ROAD WORK</text><text x="100" y="108" fill="#000" font-size="9" font-weight="800" text-anchor="middle">AHEAD</text>`, "Orange Sign = Construction & Road Work");
            case 10: // School Zone Pentagon
                return this.svgSign(`<polygon points="100,20 150,55 150,130 50,130 50,55" fill="#CCFF00" stroke="#000" stroke-width="3"/><text x="100" y="70" font-size="24" text-anchor="middle">🚸</text><text x="100" y="100" fill="#000" font-size="10" font-weight="900" text-anchor="middle">SCHOOL</text><text x="100" y="115" fill="#000" font-size="9" font-weight="800" text-anchor="middle">CROSSING</text>`, "5-Sided Pentagon = School Zone Crossing");
            case 11: // Railroad Crossing Round Sign
                return this.svgSign(`<circle cx="100" cy="80" r="55" fill="#FBC02D" stroke="#000" stroke-width="4"/><line x1="60" y1="40" x2="140" y2="120" stroke="#000" stroke-width="6"/><line x1="60" y1="120" x2="140" y2="40" stroke="#000" stroke-width="6"/><text x="68" y="88" fill="#000" font-size="22" font-weight="900" text-anchor="middle">R</text><text x="132" y="88" fill="#000" font-size="22" font-weight="900" text-anchor="middle">R</text>`, "Round Yellow RXR = Railroad Crossing Ahead");
            case 12: // Red Circle with Slash (Prohibition)
                return this.svgSign(`<circle cx="100" cy="80" r="50" fill="#FFFFFF" stroke="#D32F2F" stroke-width="8"/><path d="M90,95 L90,65 Q90,55 105,55 Q120,55 120,65 L120,80 L130,70" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/><line x1="65" y1="45" x2="135" y2="115" stroke="#D32F2F" stroke-width="8"/>`, "Red Circle with Slash = Prohibited Action (No U-Turn)");
            case 13: // Flashing Red Signal
                return this.svgTrafficLight('red', true, 'Treat Flashing Red as a STOP Sign');
            case 14: // Flashing Yellow Signal
                return this.svgTrafficLight('yellow', true, 'Flashing Yellow = Proceed with Caution');
            case 15: // Red Arrow Signal
                return this.svgArrowLight('red', 'Red Arrow = NO Turn in Direction of Arrow');
            case 16: // Yellow Arrow Signal
                return this.svgArrowLight('yellow', 'Yellow Arrow = Protected Turning Time Ending');
            case 17: // Green Arrow Signal
                return this.svgArrowLight('green', 'Green Arrow = Protected Turn (Right-of-Way)');
            case 18: // Slippery When Wet
                return this.svgSign(`<g transform="rotate(45 100 80)"><rect x="55" y="35" width="90" height="90" fill="#FBC02D" stroke="#000" stroke-width="3" rx="4"/></g><text x="100" y="70" font-size="22" text-anchor="middle">🚗</text><path d="M85,85 Q100,75 85,95 Q100,105 85,115" fill="none" stroke="#000" stroke-width="2"/><path d="M115,85 Q130,75 115,95 Q130,105 115,115" fill="none" stroke="#000" stroke-width="2"/>`, "Yellow Diamond = Road Slippery When Wet");
            case 19: // Merging Traffic Sign
                return this.svgSign(`<g transform="rotate(45 100 80)"><rect x="55" y="35" width="90" height="90" fill="#FBC02D" stroke="#000" stroke-width="3" rx="4"/></g><line x1="90" y1="110" x2="90" y2="50" stroke="#000" stroke-width="5"/><path d="M83,60 L90,48 L97,60" fill="#000"/><path d="M118,105 Q105,90 92,75" fill="none" stroke="#000" stroke-width="4"/>`, "Yellow Diamond = Merging Traffic From Right");
            case 20: // Divided Highway Begins
                return this.svgSign(`<g transform="rotate(45 100 80)"><rect x="55" y="35" width="90" height="90" fill="#FBC02D" stroke="#000" stroke-width="3" rx="4"/></g><polygon points="100,50 93,65 107,65" fill="#000"/><path d="M80,110 Q80,75 90,65 L82,65" fill="none" stroke="#000" stroke-width="4"/><path d="M120,110 Q120,75 110,65 L118,65" fill="none" stroke="#000" stroke-width="4"/>`, "Yellow Diamond = Divided Highway Begins");

            // --- RULES OF THE ROAD (21-40) ---
            case 21: // Solid Double Yellow Lines
                return this.svgRoadDiagram('double_solid_yellow', 'Double Solid Yellow Lines = No Passing Either Direction');
            case 22: // Broken Yellow beside Solid
                return this.svgRoadDiagram('solid_broken_yellow', 'Passing Allowed Only on Side with Broken Line');
            case 23: // Center Left Turn Lane
                return this.svgRoadDiagram('center_turn_lane', 'Center Left Turn Lane (Max 200 Feet Driving)');
            case 24: // Solid White Line
                return this.svgRoadDiagram('solid_white_lane', 'Solid White Line = Discourages Lane Changes');
            case 25: // Broken White Line
                return this.svgRoadDiagram('broken_white_lane', 'Broken White Line = Separates Lanes in Same Direction');
            case 26: // Carpool / HOV Diamond Lane
                return this.svgRoadDiagram('hov_lane', 'HOV / Carpool Lane (Diamond Symbol)');
            case 27: // Right Turn on Red
                return this.svgIntersectionDiagram('right_turn_red', 'Right Turn on Red: Full Stop First & Yield to Traffic');
            case 28: // Turn Signal 100 Feet
                return this.svgRoadDiagram('signal_100ft', 'Signal at Least 100 Feet Before Turning');
            case 29: // Blind Spot Shoulder Check
                return this.svgCarDiagram('blind_spot', 'Always Turn Head to Check Blind Spots Before Changing Lanes');
            case 30: // Roundabout Counter-Clockwise
                return this.svgRoundabout('roundabout_flow', 'Roundabouts Flow Counter-Clockwise (Yield on Entry)');
            case 31: // Passing on Right
                return this.svgRoadDiagram('pass_on_right', 'Passing on Right Allowed Only When 2+ Lanes in Same Direction');
            case 32: // School Zone 25 MPH
                return this.svgSpeedDiagram(25, 'School Zone Speed Limit (When Children Present): 25 MPH');
            case 33: // Blind Intersection 15 MPH
                return this.svgSpeedDiagram(15, 'Blind Intersection Speed Limit: 15 MPH');
            case 34: // Alley 15 MPH
                return this.svgSpeedDiagram(15, 'Alley Speed Limit: 15 MPH');
            case 35: // Railroad Crossing 15 MPH
                return this.svgSpeedDiagram(15, 'Railroad Crossing (No Gates/Signals): 15 MPH');
            case 36: // Basic Speed Law
                return this.svgSpeedDiagram('CONDITIONS', 'CA Basic Speed Law: Never Drive Faster Than Safe for Conditions');
            case 37: // Truck Blind Spots (No-Zone)
                return this.svgTruckNoZone('If You Cannot See Truck Mirrors, Driver Cannot See You');
            case 38: // Left Turn One-Way to One-Way
                return this.svgIntersectionDiagram('one_way_turn', 'Left Turn One-Way to One-Way: Turn into Left-Most Lane');
            case 39: // Legal U-Turn
                return this.svgRoadDiagram('u_turn', 'U-Turns Permitted When Across Double Yellow if Safe');
            case 40: // 3 Feet Bicycle Passing Buffer
                return this.svgBikeBuffer('California Law Requires At Least 3 Feet Buffer When Passing Bicyclists');

            // --- SAFE DRIVING (41-60) ---
            case 41: // 3-Second Following Distance
                return this.svgFollowingDistance('3-Second Rule for Safe Following Distance in Good Weather');
            case 42: // Hydroplaning
                return this.svgHydroplane('Hydroplaning: Tires Ride on Film of Water (Slow Down in Rain)');
            case 43: // Fog Low Beams
                return this.svgFogHeadlights('Use Low Beam Headlights in Fog (High Beams Reflect Back)');
            case 44: // High Beams 500ft / 300ft
                return this.svgHighBeams('Dim High Beams 500ft From Oncoming / 300ft Following Car');
            case 45: // Night Driving Stopping Range
                return this.svgNightDriving('Drive at a Speed Where You Can Stop Within Headlight Range');
            case 46: // Tailgating
                return this.svgTailgating('Avoid Tailgating: Allow Extra Space Behind Aggressive Drivers');
            case 47: // Cell Phone / Hands Free
                return this.svgCellPhoneLaw('Hands-Free Only for 18+; Minors Cannot Use Phones Even Hands-Free');
            case 48: // BAC 0.08% Limit
                return this.svgBacDiagram('0.08%', 'Legal BAC Limit for Adult Drivers (21+) is Under 0.08%');
            case 49: // BAC 0.01% Under 21
                return this.svgBacDiagram('0.01%', 'Zero Tolerance Law for Under 21: Illegal with 0.01% or Higher');
            case 50: // Prescription Medications DUI
                return this.svgMedicationWarning('DUI Applies to Prescription & OTC Meds That Cause Drowsiness');
            case 51: // Headset / Earphones in Both Ears
                return this.svgHeadsetRule('Illegal to Wear Headsets/Earplugs Covering Both Ears While Driving');
            case 52: // Aggressive Driver Road Rage
                return this.svgRoadRage('Avoid Eye Contact & Give Room to Aggressive Drivers');
            case 53: // Rubbernecking
                return this.svgRubbernecking('Rubbernecking (Slowing to Look at Accidents) Causes Traffic Jams');
            case 54: // Scanning 10-15 Seconds Ahead
                return this.svgScanningAhead('Scan Road 10 to 15 Seconds Ahead (About 1 City Block)');
            case 55: // Sun Glare
                return this.svgSunGlare('Use Sun Visors, Sunglasses, & Maintain Greater Following Distance');
            case 56: // Side Mirror Blind Spots
                return this.svgMirrorCheck('Adjust Mirrors & Always Check Over Shoulder Before Merging');
            case 57: // Child Safety Seat
                return this.svgChildSeat('Children Under 8 or Under 4\'9" Must Use Approved Booster Seat');
            case 58: // Smog & Exhaust
                return this.svgSmogCheck('Regular Smog & Emissions Inspections Reduce Air Pollution');
            case 59: // Wipers on = Headlights on
                return this.svgWipersHeadlights('California Law: Must Turn On Headlights Whenever Wipers Are In Continuous Use');
            case 60: // Highway Merge Speed
                return this.svgHighwayMerge('Accelerate on Ramp to Match Highway Traffic Speed');

            // --- PARKING (61-80) ---
            case 61: // Uphill with Curb
                return this.svgCurbWheel('uphill_curb', 'Uphill With Curb: Turn Wheels AWAY From Curb (Left)');
            case 62: // Downhill with Curb
                return this.svgCurbWheel('downhill_curb', 'Downhill With Curb: Turn Wheels TOWARD Curb (Right)');
            case 63: // Uphill/Downhill WITHOUT Curb
                return this.svgCurbWheel('no_curb', 'Without Curb: Turn Wheels TOWARD Road Edge / Shoulder');
            case 64: // White Curb
                return this.svgCurbColor('#FFFFFF', '#000000', 'WHITE CURB', 'White Curb: Stop Only for Passenger Pick-Up or Mail');
            case 65: // Green Curb
                return this.svgCurbColor('#1B8A46', '#FFFFFF', 'GREEN CURB', 'Green Curb: Park for Limited Time (Check Posted Signs)');
            case 66: // Yellow Curb
                return this.svgCurbColor('#FBC02D', '#000000', 'YELLOW CURB', 'Yellow Curb: Loading Freight/Passengers for Commercial Vehicles');
            case 67: // Red Curb
                return this.svgCurbColor('#D32F2F', '#FFFFFF', 'RED CURB', 'Red Curb: No Stopping, Standing, or Parking At Any Time');
            case 68: // Blue Curb
                return this.svgCurbColor('#1565C0', '#FFFFFF', 'BLUE CURB ♿', 'Blue Curb: Disabled Persons with Valid Placard Only');
            case 69: // Fire Hydrant 15 Feet
                return this.svgHydrantDistance('15 FT', 'Must Park At Least 15 Feet Away From Fire Hydrants');
            case 70: // Railroad Track Parking 7.5 Feet
                return this.svgRailDistance('7.5 FT', 'Never Park Within 7.5 Feet of Railroad Tracks');
            case 71: // Crosswalk Parking Prohibition
                return this.svgCrosswalkNoParking('Never Park On or Blocking a Marked Crosswalk or Sidewalk');
            case 72: // Parallel Parking 18 Inches
                return this.svgParallelPark('18 in', 'Park Within 18 Inches of the Curb When Parallel Parking');
            case 73: // Freeway Shoulder Emergency Parking
                return this.svgFreewayShoulder('Park on Freeway Shoulder ONLY in True Emergency (Max 4 Hours)');
            case 74: // Children Unattended in Car
                return this.svgChildInCar('Illegal to Leave Child 6 or Younger Unattended in Vehicle (Kaitlyn\'s Law)');
            case 75: // Pets in Hot Car
                return this.svgPetInCar('Illegal to Leave Pets in Vehicle During Extreme Hot/Cold Weather');
            case 76: // Diagonal Parking
                return this.svgAngledParking('Angled Parking: Pull In Forward & Back Out with Caution');
            case 77: // Fire Station 20 Feet
                return this.svgFireStationDistance('20 FT', 'No Parking Within 20 Feet of Fire Station Driveway');
            case 78: // Bridge / Tunnel No Parking
                return this.svgBridgeParking('Never Park on a Bridge, Overpass, or Inside a Tunnel');
            case 79: // Double Parking
                return this.svgDoubleParking('Double Parking (Parking Alongside Another Car) is Always Illegal');
            case 80: // Railroad Track Parking Block
                return this.svgRailBlock('Do Not Stop On Railroad Tracks While Waiting in Traffic');

            // --- RIGHT OF WAY (81-100) ---
            case 81: // 4-Way Stop
                return this.svgIntersectionRightOfWay('4way_stop', '4-Way Stop: First to Arrive Goes First; Tie Goes to Car on RIGHT');
            case 82: // T-Intersection
                return this.svgIntersectionRightOfWay('t_intersection', 'T-Intersection: Vehicles on Dead-End Road Must Yield to Through Road');
            case 83: // Left Turn Yield to Oncoming
                return this.svgIntersectionRightOfWay('left_turn_yield', 'Left Turns Must Yield to All Oncoming Traffic and Pedestrians');
            case 84: // Pedestrian Crosswalk
                return this.svgPedestrianYield('Always Yield Right-of-Way to Pedestrians in Marked or Unmarked Crosswalks');
            case 85: // Blind Pedestrian White Cane
                return this.svgBlindPedestrian('Blind Pedestrians with White Cane or Guide Dog Always Have Right-of-Way');
            case 86: // Emergency Vehicle Sirens
                return this.svgEmergencyVehicle('Pull to the RIGHT Edge of Road and STOP for Emergency Sirens/Lights');
            case 87: // Move Over Law
                return this.svgMoveOverLaw('Move Over a Lane or Slow Down for Stopped Emergency / Caltrans Vehicles');
            case 88: // School Bus Flashing Red
                return this.svgSchoolBusLights('Stop in BOTH Directions for School Bus Flashing Red (Unless Divided Road)');
            case 89: // Roundabout Entry Yield
                return this.svgRoundabout('roundabout_entry', 'Yield to Traffic Already Circulating Inside Roundabout on Left');
            case 90: // Mountain Road Narrow
                return this.svgMountainRoad('Vehicle Facing Downhill Must Back Up to Give Right-of-Way');
            case 91: // Funeral Procession
                return this.svgFuneralProcession('Do Not Cut Through an Escorted Funeral Procession');
            case 92: // Transit Bus Re-Entry
                return this.svgTransitBus('Yield to Public Transit Buses Signaling to Re-Enter Traffic');
            case 93: // Backing Out of Driveway
                return this.svgDrivewayYield('Yield to All Pedestrians on Sidewalk and Vehicles on Road');
            case 94: // Merging From Parked Curb
                return this.svgCurbMerge('Yield to Through Traffic Before Pulling Out From Curb');
            case 95: // Traffic Circle Rules
                return this.svgRoundabout('traffic_circle', 'Follow Traffic Flow to the Right in Traffic Circles');
            case 96: // Jaywalking / Pedestrian Outside Crosswalk
                return this.svgPedestrianYield('Drivers Must Exercise Due Care to Avoid Hitting Jaywalkers');
            case 97: // Railway Gates Lowering
                return this.svgRailCrossing('Stop 15 to 50 Feet From Tracks When Gate is Lowering or Flashing');
            case 98: // Light Rail / Streetcar Safety Zone
                return this.svgLightRail('Do Not Drive Through a Safety Zone Where Passengers Board');
            case 99: // Bicyclist Right-of-Way
                return this.svgBikeBuffer('Bicyclists Have Same Rights and Duties as Motor Vehicle Drivers');
            case 100: // Flashing Yellow Arrow Turn
                return this.svgArrowLight('yellow', 'Flashing Yellow Arrow: Turns Allowed After Yielding to Oncoming');

            // --- EMERGENCIES (101-120) ---
            case 101: // Tire Blowout
                return this.svgEmergencyAction('blowout', 'Tire Blowout: Hold Steering Firmly, Ease Off Gas, Brake Gently');
            case 102: // Brake Failure
                return this.svgEmergencyAction('brake_failure', 'Brake Failure: Pump Brakes, Downshift to Low Gear, Apply Parking Brake');
            case 103: // Stuck Gas Pedal
                return this.svgEmergencyAction('stuck_gas', 'Stuck Accelerator: Shift to NEUTRAL, Apply Brakes, Pull Off Road');
            case 104: // Skidding Recovery
                return this.svgEmergencyAction('skid', 'Skidding: Steer in Direction of Skid (Do Not Slam on Brakes)');
            case 105: // Engine Overheating
                return this.svgEmergencyAction('overheat', 'Overheating: Turn Off AC, Turn On Heater, Pull Over, Never Open Hot Cap');
            case 106: // Stalled on Railroad Tracks
                return this.svgEmergencyAction('train_stall', 'Stalled on Tracks: Exit Immediately, Run 45° Toward Approaching Train');
            case 107: // Sinking in Deep Water
                return this.svgEmergencyAction('water', 'Sinking Car: Unbuckle Seatbelt, Roll Down Window Immediately');
            case 108: // Headlight Failure
                return this.svgEmergencyAction('headlight_fail', 'Headlight Failure: Flip Dimmer/Hazards Switch, Pull Off Road Safely');
            case 109: // Hood Flies Open
                return this.svgEmergencyAction('hood_open', 'Hood Open: Look Under Hood Gap or Out Side Window, Pull Over');
            case 110: // Off-Road Shoulder Recovery
                return this.svgEmergencyAction('offroad', 'Wheels Drop Off Pavement: Ease Off Gas, Slow Down, Steer Smoothly Back');
            case 111: // Oncoming Car in Your Lane
                return this.svgEmergencyAction('oncoming', 'Oncoming Vehicle: Honk, Flash Lights, Steer to the RIGHT');
            case 112: // Vehicle Fire
                return this.svgEmergencyAction('fire', 'Vehicle Fire: Pull Over, Turn Off Engine, Move 100+ Feet Away, Call 911');
            case 113: // Earthquake While Driving
                return this.svgEmergencyAction('earthquake', 'Earthquake: Stop Away from Bridges/Powerlines, Stay Inside Vehicle');
            case 114: // Carbon Monoxide Fumes
                return this.svgEmergencyAction('exhaust_co', 'Never Warm Up Car in Enclosed Garage; Check Exhaust for Leaks');
            case 115: // Crash with Injury
                return this.svgEmergencyAction('crash_injury', 'Injury Accident: Stop, Call 911, Render First Aid, Exchange Info');
            case 116: // Report to DMV within 10 Days
                return this.svgEmergencyAction('dmv_report', 'Report to DMV (Form SR-1) Within 10 Days if Damage > $1,000 or Injury');
            case 117: // Hit Parked Car
                return this.svgEmergencyAction('parked_hit', 'Hit Parked Vehicle: Leave Note with Name/Address & Report to Police');
            case 118: // Hitting Animal
                return this.svgEmergencyAction('animal_hit', 'Hit Injured Animal: Do Not Leave in Road, Call Humane Society or Police');
            case 119: // Flares Placement 200-300 Feet
                return this.svgEmergencyAction('flares', 'Place Warning Flares / Reflectors 200 to 300 Feet Behind Vehicle');
            case 120: // Good Samaritan Law
                return this.svgEmergencyAction('good_samaritan', 'Good Samaritan Law: Protects Those Rendering Emergency Aid in Good Faith');

            default:
                return this.svgGenericCategory(cat);
        }
    },

    // --- SVG HELPER GENERATORS ---
    svgSign(innerContent, caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-sign" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="none"/>
                    ${innerContent}
                </svg>
                ${caption ? `<span class="q-svg-caption">${caption}</span>` : ''}
            </div>
        `;
    },

    svgTrafficLight(activeColor, isFlashing, caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect x="75" y="15" width="50" height="130" rx="10" fill="#212121" stroke="#424242" stroke-width="3"/>
                    <circle cx="100" cy="40" r="16" fill="${activeColor === 'red' ? '#FF1744' : '#37474F'}" ${activeColor === 'red' && isFlashing ? 'stroke="#FFD700" stroke-width="3"' : ''}/>
                    <circle cx="100" cy="80" r="16" fill="${activeColor === 'yellow' ? '#FFD600' : '#37474F'}" ${activeColor === 'yellow' && isFlashing ? 'stroke="#FFF" stroke-width="3"' : ''}/>
                    <circle cx="100" cy="120" r="16" fill="${activeColor === 'green' ? '#00E676' : '#37474F'}"/>
                    ${isFlashing ? `<circle cx="100" cy="${activeColor === 'red' ? 40 : 80}" r="22" fill="none" stroke="#FFEB3B" stroke-width="2" stroke-dasharray="4,4"/>` : ''}
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgArrowLight(color, caption) {
        const hex = color === 'red' ? '#FF1744' : color === 'yellow' ? '#FFD600' : '#00E676';
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect x="75" y="35" width="50" height="90" rx="10" fill="#212121" stroke="#424242" stroke-width="3"/>
                    <circle cx="100" cy="80" r="20" fill="#263238"/>
                    <path d="M108,68 L92,80 L108,92 M92,80 L115,80" fill="none" stroke="${hex}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgRoadDiagram(type, caption) {
        let roadLines = '';
        if (type === 'double_solid_yellow') {
            roadLines = `
                <line x1="97" y1="0" x2="97" y2="160" stroke="#FFD600" stroke-width="3"/>
                <line x1="103" y1="0" x2="103" y2="160" stroke="#FFD600" stroke-width="3"/>
            `;
        } else if (type === 'solid_broken_yellow') {
            roadLines = `
                <line x1="97" y1="0" x2="97" y2="160" stroke="#FFD600" stroke-width="3"/>
                <line x1="103" y1="0" x2="103" y2="160" stroke="#FFD600" stroke-width="3" stroke-dasharray="12,8"/>
            `;
        } else if (type === 'center_turn_lane') {
            roadLines = `
                <line x1="75" y1="0" x2="75" y2="160" stroke="#FFD600" stroke-width="2"/>
                <line x1="80" y1="0" x2="80" y2="160" stroke="#FFD600" stroke-width="2" stroke-dasharray="8,6"/>
                <line x1="120" y1="0" x2="120" y2="160" stroke="#FFD600" stroke-width="2" stroke-dasharray="8,6"/>
                <line x1="125" y1="0" x2="125" y2="160" stroke="#FFD600" stroke-width="2"/>
                <path d="M100,50 L95,65 L105,65 Z M95,65 Q95,75 85,80" fill="none" stroke="#FFF" stroke-width="2"/>
                <path d="M100,110 L105,95 L95,95 Z M105,95 Q105,85 115,80" fill="none" stroke="#FFF" stroke-width="2"/>
            `;
        } else if (type === 'solid_white_lane') {
            roadLines = `<line x1="100" y1="0" x2="100" y2="160" stroke="#FFFFFF" stroke-width="4"/>`;
        } else if (type === 'broken_white_lane') {
            roadLines = `<line x1="100" y1="0" x2="100" y2="160" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="14,10"/>`;
        } else if (type === 'hov_lane') {
            roadLines = `
                <line x1="70" y1="0" x2="70" y2="160" stroke="#FFD600" stroke-width="3"/>
                <line x1="130" y1="0" x2="130" y2="160" stroke="#FFF" stroke-width="3" stroke-dasharray="12,8"/>
                <polygon points="40,65 50,80 40,95 30,80" fill="none" stroke="#FFF" stroke-width="3"/>
                <text x="40" y="115" fill="#FFF" font-size="9" font-weight="700" text-anchor="middle">HOV 2+</text>
            `;
        } else if (type === 'signal_100ft') {
            roadLines = `
                <line x1="100" y1="0" x2="100" y2="160" stroke="#FFD600" stroke-width="3"/>
                <rect x="125" y="70" width="26" height="45" rx="5" fill="#1565C0"/>
                <circle cx="127" cy="74" r="4" fill="#FFEB3B"/>
                <path d="M138,40 L138,65" stroke="#FFEB3B" stroke-width="3" stroke-dasharray="4,4"/>
                <text x="170" y="85" fill="#FFD600" font-size="11" font-weight="800">100 FT</text>
            `;
        } else if (type === 'u_turn') {
            roadLines = `
                <line x1="100" y1="0" x2="100" y2="70" stroke="#FFD600" stroke-width="3"/>
                <line x1="100" y1="120" x2="100" y2="160" stroke="#FFD600" stroke-width="3"/>
                <path d="M125,120 Q125,75 100,75 Q75,75 75,120" fill="none" stroke="#00E676" stroke-width="4" stroke-linecap="round"/>
                <polygon points="70,110 75,125 80,110" fill="#00E676"/>
            `;
        } else if (type === 'pass_on_right') {
            roadLines = `
                <line x1="70" y1="0" x2="70" y2="160" stroke="#FFF" stroke-width="2" stroke-dasharray="10,6"/>
                <line x1="130" y1="0" x2="130" y2="160" stroke="#FFF" stroke-width="2" stroke-dasharray="10,6"/>
                <rect x="40" y="40" width="22" height="38" rx="4" fill="#757575"/>
                <rect x="95" y="90" width="22" height="38" rx="4" fill="#1565C0"/>
                <path d="M106,90 L106,35" stroke="#00E676" stroke-width="3" stroke-dasharray="4,3"/>
                <polygon points="102,40 106,30 110,40" fill="#00E676"/>
            `;
        }

        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    ${roadLines}
                    ${type !== 'signal_100ft' && type !== 'pass_on_right' && type !== 'u_turn' ? `
                        <rect x="50" y="85" width="24" height="42" rx="4" fill="#1565C0"/>
                        <rect x="125" y="30" width="24" height="42" rx="4" fill="#E53935"/>
                    ` : ''}
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgIntersectionDiagram(type, caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#2E7D32"/>
                    <!-- Road Cross -->
                    <rect x="65" y="0" width="70" height="160" fill="#37474F"/>
                    <rect x="0" y="45" width="200" height="70" fill="#37474F"/>
                    <!-- Center Markings -->
                    <line x1="100" y1="0" x2="100" y2="45" stroke="#FFD600" stroke-width="2"/>
                    <line x1="100" y1="115" x2="100" y2="160" stroke="#FFD600" stroke-width="2"/>
                    <line x1="0" y1="80" x2="65" y2="80" stroke="#FFD600" stroke-width="2"/>
                    <line x1="135" y1="80" x2="200" y2="80" stroke="#FFD600" stroke-width="2"/>
                    ${type === 'right_turn_red' ? `
                        <circle cx="140" cy="40" r="6" fill="#D32F2F"/>
                        <rect x="110" y="120" width="20" height="32" rx="4" fill="#1565C0"/>
                        <path d="M120,120 Q120,95 155,95" fill="none" stroke="#00E676" stroke-width="4" stroke-linecap="round"/>
                        <polygon points="150,90 160,95 150,100" fill="#00E676"/>
                    ` : `
                        <rect x="75" y="120" width="20" height="32" rx="4" fill="#1565C0"/>
                        <path d="M85,120 Q85,65 30,65" fill="none" stroke="#00E676" stroke-width="4" stroke-linecap="round"/>
                        <polygon points="35,60 25,65 35,70" fill="#00E676"/>
                    `}
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgRoundabout(type, caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#2E7D32"/>
                    <rect x="75" y="0" width="50" height="160" fill="#37474F"/>
                    <rect x="0" y="55" width="200" height="50" fill="#37474F"/>
                    <circle cx="100" cy="80" r="45" fill="#37474F"/>
                    <circle cx="100" cy="80" r="22" fill="#2E7D32" stroke="#FFF" stroke-width="2"/>
                    <!-- Arrows counter-clockwise -->
                    <path d="M100,50 Q130,50 130,80" fill="none" stroke="#FFD600" stroke-width="3"/>
                    <polygon points="126,75 130,85 134,75" fill="#FFD600"/>
                    <path d="M100,110 Q70,110 70,80" fill="none" stroke="#FFD600" stroke-width="3"/>
                    <polygon points="74,85 70,75 66,85" fill="#FFD600"/>
                    <!-- Entering Car -->
                    <rect x="104" y="130" width="16" height="25" rx="3" fill="#1565C0"/>
                    <text x="100" y="85" fill="#FFF" font-size="8" font-weight="700" text-anchor="middle">YIELD</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgSpeedDiagram(speed, caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-sign" xmlns="http://www.w3.org/2000/svg">
                    <rect x="60" y="20" width="80" height="110" fill="#FFFFFF" stroke="#000000" stroke-width="3" rx="4"/>
                    <text x="100" y="45" fill="#000" font-size="10" font-weight="800" text-anchor="middle">SPEED</text>
                    <text x="100" y="60" fill="#000" font-size="10" font-weight="800" text-anchor="middle">LIMIT</text>
                    <text x="100" y="${typeof speed === 'number' ? '105' : '95'}" fill="#000" font-size="${typeof speed === 'number' ? '36' : '14'}" font-weight="900" text-anchor="middle">${speed}</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgCurbWheel(type, caption) {
        let wheelAngle = 0;
        let curbLabel = '';
        if (type === 'uphill_curb') {
            wheelAngle = -25; // Away from curb
            curbLabel = 'UPHILL with CURB (Turn Away)';
        } else if (type === 'downhill_curb') {
            wheelAngle = 25; // Toward curb
            curbLabel = 'DOWNHILL with CURB (Turn Toward)';
        } else {
            wheelAngle = 25;
            curbLabel = 'WITHOUT CURB (Turn Toward Road Edge)';
        }

        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    <!-- Curb & Sidewalk on Right -->
                    <rect x="150" y="0" width="50" height="160" fill="#9E9E9E"/>
                    <line x1="150" y1="0" x2="150" y2="160" stroke="#E0E0E0" stroke-width="4"/>
                    <!-- Car Body -->
                    <rect x="80" y="40" width="45" height="85" rx="8" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/>
                    <rect x="85" y="55" width="35" height="25" fill="#BBDEFB" rx="3"/>
                    <rect x="85" y="90" width="35" height="20" fill="#BBDEFB" rx="3"/>
                    <!-- Front Wheels Turned -->
                    <g transform="translate(75, 50) rotate(${wheelAngle})">
                        <rect x="-4" y="-8" width="8" height="18" rx="2" fill="#212121"/>
                    </g>
                    <g transform="translate(130, 50) rotate(${wheelAngle})">
                        <rect x="-4" y="-8" width="8" height="18" rx="2" fill="#212121"/>
                    </g>
                    <!-- Rear Wheels Straight -->
                    <rect x="71" y="100" width="8" height="18" rx="2" fill="#212121"/>
                    <rect x="126" y="100" width="8" height="18" rx="2" fill="#212121"/>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgCurbColor(colorHex, textHex, title, caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    <!-- Sidewalk -->
                    <rect x="0" y="0" width="200" height="60" fill="#B0BEC5"/>
                    <!-- Painted Curb -->
                    <rect x="0" y="60" width="200" height="30" fill="${colorHex}" stroke="#424242" stroke-width="2"/>
                    <text x="100" y="80" fill="${textHex}" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="1">${title}</text>
                    <!-- Street -->
                    <rect x="0" y="90" width="200" height="70" fill="#455A64"/>
                    <rect x="60" y="105" width="80" height="40" rx="6" fill="#1565C0"/>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgTruckNoZone(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    <!-- Semi Truck -->
                    <rect x="85" y="20" width="30" height="75" rx="3" fill="#EEEEEE"/>
                    <rect x="85" y="95" width="30" height="25" rx="4" fill="#C62828"/>
                    <!-- Blind Spots (No Zones) in Red Translucent -->
                    <polygon points="85,20 115,20 140,0 60,0" fill="rgba(211,47,47,0.4)"/>
                    <polygon points="85,120 115,120 140,160 60,160" fill="rgba(211,47,47,0.4)"/>
                    <polygon points="115,40 115,100 165,120 165,30" fill="rgba(211,47,47,0.4)"/>
                    <polygon points="85,40 85,100 35,120 35,30" fill="rgba(211,47,47,0.4)"/>
                    <text x="100" y="60" fill="#D32F2F" font-size="8" font-weight="900" text-anchor="middle">NO-ZONE</text>
                    <text x="100" y="145" fill="#FFF" font-size="8" font-weight="700" text-anchor="middle">NO-ZONE (Rear)</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgFollowingDistance(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    <line x1="100" y1="0" x2="100" y2="160" stroke="#FFD600" stroke-width="2"/>
                    <rect x="110" y="15" width="24" height="40" rx="4" fill="#757575"/>
                    <rect x="110" y="105" width="24" height="40" rx="4" fill="#1565C0"/>
                    <path d="M122,60 L122,100" stroke="#00E676" stroke-width="3" stroke-dasharray="4,4"/>
                    <rect x="135" y="70" width="55" height="22" rx="4" fill="#00E676"/>
                    <text x="162" y="85" fill="#000" font-size="10" font-weight="900" text-anchor="middle">3 SECONDS</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgHydroplane(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#263238"/>
                    <!-- Water Film -->
                    <rect x="0" y="110" width="200" height="15" fill="#0288D1" opacity="0.8"/>
                    <!-- Road -->
                    <rect x="0" y="125" width="200" height="35" fill="#1E272C"/>
                    <!-- Tire riding on water -->
                    <circle cx="100" cy="90" r="30" fill="#212121" stroke="#424242" stroke-width="6"/>
                    <circle cx="100" cy="90" r="14" fill="#B0BEC5"/>
                    <!-- Water Spray -->
                    <path d="M70,115 Q50,105 40,115" stroke="#4FC3F7" stroke-width="3" fill="none"/>
                    <path d="M130,115 Q150,105 160,115" stroke="#4FC3F7" stroke-width="3" fill="none"/>
                    <text x="100" y="40" fill="#4FC3F7" font-size="14" font-weight="900" text-anchor="middle">WATER FILM (NO TRACTION)</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgFogHeadlights(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#455A64"/>
                    <!-- Fog clouds -->
                    <ellipse cx="60" cy="50" rx="50" ry="20" fill="#90A4AE" opacity="0.7"/>
                    <ellipse cx="140" cy="65" rx="60" ry="25" fill="#90A4AE" opacity="0.7"/>
                    <!-- Car -->
                    <rect x="20" y="80" width="60" height="35" rx="5" fill="#1565C0"/>
                    <!-- Low beam rays pointing down -->
                    <polygon points="80,95 180,110 180,135 80,105" fill="#FFF59D" opacity="0.7"/>
                    <text x="135" y="85" fill="#FFF" font-size="11" font-weight="800">LOW BEAMS</text>
                    <text x="135" y="100" fill="#81C784" font-size="10" font-weight="700">✓ Penetrates Fog</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgHighBeams(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#1A237E"/>
                    <rect x="15" y="85" width="40" height="24" rx="4" fill="#1565C0"/>
                    <rect x="145" y="85" width="40" height="24" rx="4" fill="#D32F2F"/>
                    <polygon points="55,90 145,75 145,115 55,100" fill="#FFF59D" opacity="0.4"/>
                    <text x="100" y="55" fill="#FFD600" font-size="12" font-weight="900" text-anchor="middle">500 FT ONCOMING</text>
                    <text x="100" y="70" fill="#FFF" font-size="10" font-weight="700" text-anchor="middle">Dim High Beams</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgNightDriving(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#0D1117"/>
                    <polygon points="30,110 170,70 170,150 30,120" fill="#FFF59D" opacity="0.35"/>
                    <rect x="10" y="105" width="35" height="20" rx="3" fill="#1565C0"/>
                    <text x="120" y="50" fill="#FFF" font-size="11" font-weight="800">STOPPING DISTANCE</text>
                    <text x="120" y="65" fill="#81C784" font-size="9" font-weight="700">Within Headlight Cone</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgTailgating(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    <rect x="40" y="60" width="45" height="30" rx="4" fill="#757575"/>
                    <rect x="95" y="60" width="45" height="30" rx="4" fill="#D32F2F"/>
                    <text x="100" y="40" fill="#FF5252" font-size="13" font-weight="900" text-anchor="middle">⚠️ TAILGATING HAZARD</text>
                    <text x="100" y="125" fill="#FFF" font-size="10" font-weight="700" text-anchor="middle">No Reaction Time</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgCellPhoneLaw(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="80" r="60" fill="#FFF" stroke="#D32F2F" stroke-width="8"/>
                    <rect x="85" y="48" width="30" height="64" rx="5" fill="#212121"/>
                    <rect x="88" y="55" width="24" height="45" fill="#90CAF9"/>
                    <line x1="58" y1="38" x2="142" y2="122" stroke="#D32F2F" stroke-width="8"/>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgBacDiagram(bac, caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" y="25" width="140" height="110" rx="8" fill="#212121" stroke="#FFD600" stroke-width="3"/>
                    <text x="100" y="55" fill="#FFF" font-size="12" font-weight="800" text-anchor="middle">BLOOD ALCOHOL</text>
                    <text x="100" y="95" fill="#FF1744" font-size="34" font-weight="900" text-anchor="middle">${bac}</text>
                    <text x="100" y="120" fill="#FFD600" font-size="10" font-weight="700" text-anchor="middle">LEGAL LIMIT</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgHydrantDistance(dist, caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    <!-- Red Hydrant -->
                    <rect x="40" y="60" width="20" height="40" rx="3" fill="#D32F2F"/>
                    <circle cx="50" cy="55" r="8" fill="#D32F2F"/>
                    <!-- Distance Arrow -->
                    <line x1="50" y1="120" x2="150" y2="120" stroke="#FFD600" stroke-width="3"/>
                    <text x="100" y="112" fill="#FFD600" font-size="14" font-weight="900" text-anchor="middle">${dist} MINIMUM</text>
                    <rect x="150" y="60" width="40" height="50" rx="4" fill="#1565C0"/>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgPedestrianYield(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    <!-- Crosswalk White Bars -->
                    <rect x="20" y="70" width="160" height="8" fill="#FFF"/>
                    <rect x="20" y="85" width="160" height="8" fill="#FFF"/>
                    <rect x="20" y="100" width="160" height="8" fill="#FFF"/>
                    <!-- Pedestrian -->
                    <text x="100" y="60" font-size="32" text-anchor="middle">🚶</text>
                    <rect x="85" y="125" width="30" height="25" rx="3" fill="#1565C0"/>
                    <text x="100" y="25" fill="#00E676" font-size="12" font-weight="900" text-anchor="middle">PEDESTRIAN RIGHT-OF-WAY</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgEmergencyVehicle(caption) {
        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="160" fill="#37474F"/>
                    <!-- Emergency Ambulance/Police -->
                    <rect x="30" y="60" width="55" height="35" rx="4" fill="#D32F2F"/>
                    <circle cx="57" cy="50" r="7" fill="#00E5FF"/>
                    <text x="57" y="82" fill="#FFF" font-size="10" font-weight="900" text-anchor="middle">POLICE</text>
                    <!-- Siren Waves -->
                    <path d="M85,55 Q95,45 85,35" stroke="#FF1744" stroke-width="3" fill="none"/>
                    <path d="M92,60 Q105,45 92,30" stroke="#00E5FF" stroke-width="3" fill="none"/>
                    <!-- Civilian car pulled to right -->
                    <rect x="135" y="60" width="45" height="30" rx="4" fill="#1565C0"/>
                    <text x="157" y="115" fill="#FFD600" font-size="9" font-weight="800" text-anchor="middle">PULL RIGHT & STOP</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgEmergencyAction(actionType, caption) {
        let icon = '⚠️';
        let title = 'EMERGENCY ACTION';
        let desc = 'Safety Protocol';

        if (actionType === 'blowout') {
            icon = '🛞';
            title = 'TIRE BLOWOUT';
            desc = 'Grip Wheel • Ease Off Gas';
        } else if (actionType === 'brake_failure') {
            icon = '🛑';
            title = 'BRAKE FAILURE';
            desc = 'Pump Brakes • Downshift';
        } else if (actionType === 'stuck_gas') {
            icon = '⚡';
            title = 'STUCK ACCELERATOR';
            desc = 'Shift to NEUTRAL • Brake';
        } else if (actionType === 'skid') {
            icon = '🔄';
            title = 'SKIDDING RECOVERY';
            desc = 'Steer Into Skid • No Brakes';
        } else if (actionType === 'overheat') {
            icon = '🌡️';
            title = 'ENGINE OVERHEATING';
            desc = 'Turn Off A/C • Turn On Heater';
        } else if (actionType === 'train_stall') {
            icon = '🚆';
            title = 'TRACK STALL';
            desc = 'Exit Car • Run 45° Toward Train';
        } else if (actionType === 'fire') {
            icon = '🔥';
            title = 'VEHICLE FIRE';
            desc = 'Stop • Evacuate 100+ Feet Away';
        } else if (actionType === 'flares') {
            icon = '🚨';
            title = 'FLARES / REFLECTORS';
            desc = 'Place 200-300 Feet Behind Car';
        }

        return `
            <div class="q-illustration-wrapper">
                <svg viewBox="0 0 200 160" class="q-svg-diagram" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="20" width="160" height="120" rx="10" fill="#212121" stroke="#D32F2F" stroke-width="3"/>
                    <text x="100" y="60" font-size="28" text-anchor="middle">${icon}</text>
                    <text x="100" y="90" fill="#FF5252" font-size="12" font-weight="900" text-anchor="middle">${title}</text>
                    <text x="100" y="115" fill="#FFD600" font-size="10" font-weight="700" text-anchor="middle">${desc}</text>
                </svg>
                <span class="q-svg-caption">${caption}</span>
            </div>
        `;
    },

    svgCarDiagram(type, caption) {
        return this.svgRoadDiagram('signal_100ft', caption);
    },
    svgBikeBuffer(caption) {
        return this.svgRoadDiagram('broken_white_lane', caption);
    },
    svgMirrorCheck(caption) {
        return this.svgRoadDiagram('solid_white_lane', caption);
    },
    svgScanningAhead(caption) {
        return this.svgRoadDiagram('broken_white_lane', caption);
    },
    svgSunGlare(caption) {
        return this.svgRoadDiagram('signal_100ft', caption);
    },
    svgChildSeat(caption) {
        return this.svgEmergencyAction('blowout', caption);
    },
    svgSmogCheck(caption) {
        return this.svgEmergencyAction('overheat', caption);
    },
    svgWipersHeadlights(caption) {
        return this.svgFogHeadlights(caption);
    },
    svgHighwayMerge(caption) {
        return this.svgRoadDiagram('pass_on_right', caption);
    },
    svgMedicationWarning(caption) {
        return this.svgEmergencyAction('stuck_gas', caption);
    },
    svgHeadsetRule(caption) {
        return this.svgCellPhoneLaw(caption);
    },
    svgRoadRage(caption) {
        return this.svgTailgating(caption);
    },
    svgRubbernecking(caption) {
        return this.svgTailgating(caption);
    },
    svgRailDistance(dist, caption) {
        return this.svgHydrantDistance(dist, caption);
    },
    svgCrosswalkNoParking(caption) {
        return this.svgPedestrianYield(caption);
    },
    svgParallelPark(dist, caption) {
        return this.svgHydrantDistance(dist, caption);
    },
    svgFreewayShoulder(caption) {
        return this.svgRoadDiagram('solid_white_lane', caption);
    },
    svgChildInCar(caption) {
        return this.svgEmergencyAction('overheat', caption);
    },
    svgPetInCar(caption) {
        return this.svgEmergencyAction('overheat', caption);
    },
    svgAngledParking(caption) {
        return this.svgRoadDiagram('solid_white_lane', caption);
    },
    svgFireStationDistance(dist, caption) {
        return this.svgHydrantDistance(dist, caption);
    },
    svgBridgeParking(caption) {
        return this.svgRoadDiagram('solid_white_lane', caption);
    },
    svgDoubleParking(caption) {
        return this.svgRoadDiagram('pass_on_right', caption);
    },
    svgRailBlock(caption) {
        return this.svgHydrantDistance('15 FT', caption);
    },
    svgIntersectionRightOfWay(type, caption) {
        return this.svgIntersectionDiagram(type, caption);
    },
    svgBlindPedestrian(caption) {
        return this.svgPedestrianYield(caption);
    },
    svgMoveOverLaw(caption) {
        return this.svgEmergencyVehicle(caption);
    },
    svgSchoolBusLights(caption) {
        return this.svgEmergencyVehicle(caption);
    },
    svgMountainRoad(caption) {
        return this.svgRoadDiagram('double_solid_yellow', caption);
    },
    svgFuneralProcession(caption) {
        return this.svgRoadDiagram('broken_white_lane', caption);
    },
    svgTransitBus(caption) {
        return this.svgRoadDiagram('broken_white_lane', caption);
    },
    svgDrivewayYield(caption) {
        return this.svgPedestrianYield(caption);
    },
    svgCurbMerge(caption) {
        return this.svgRoadDiagram('solid_white_lane', caption);
    },
    svgRailCrossing(caption) {
        return this.svgHydrantDistance('15-50 FT', caption);
    },
    svgLightRail(caption) {
        return this.svgPedestrianYield(caption);
    },
    svgGenericCategory(category) {
        return this.svgSign(`<text x="100" y="80" font-size="32" text-anchor="middle">🚗</text><text x="100" y="115" fill="#000" font-size="12" font-weight="800" text-anchor="middle">${category}</text>`, category);
    }
};

window.Illustrations = Illustrations;
