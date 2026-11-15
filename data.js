// SI disclosure: this text and code were written with the help of Claude, an AI assistant by Anthropic.
// Facts were checked against NASA pages listed in the site credits.

const hardware = [
  {
    name: "Surveyor 3", zone: "Moon", icon: "🛰️", status: "silent",
    where: "Ocean of Storms, the Moon",
    when: "Landed April 1967 and worked for about two weeks",
    voice: "Hi, I'm Surveyor 3! I landed on the Moon in 1967 with a camera and a little scoop, before any astronaut had stepped there.",
    science: "I dug into the Moon's soil and found it felt like wet sand, strong enough to hold a spacecraft. That told NASA it was safe to land astronauts.",
    fact: "In 1969, Apollo 12 astronauts walked over to me, about 180 meters from their lander, and took my camera home to study how space affects machines."
  },
  {
    name: "Apollo Lunar Rovers", zone: "Moon", icon: "🚙", status: "silent",
    where: "Three rovers parked on the Moon",
    when: "Driven by astronauts on Apollo 15, 16 and 17",
    voice: "We're the Moon buggies! Astronauts drove us across the dusty surface and then left us parked when they flew home.",
    science: "We let astronauts travel much farther than they could walk, so they could collect rocks from more places and learn the Moon's history.",
    fact: "Nobody has driven us since. All three of us are still parked on the Moon."
  },
  {
    name: "Viking 1 Lander", zone: "Mars", icon: "🤖", status: "silent",
    where: "Mars",
    when: "Landed July 20, 1976 and worked until November 1982",
    voice: "I'm Viking 1, the first NASA spacecraft to land and work on Mars. I stayed for more than six years!",
    science: "I tested Martian soil to look for signs of life, took pictures all around me, and measured the weather. I did not find clear signs of life, but I taught scientists a lot about Mars.",
    fact: "My record for working the longest on Mars lasted until 2010, when the rover Opportunity beat it."
  },
  {
    name: "Sojourner", zone: "Mars", icon: "🚜", status: "silent",
    where: "Mars, near the Pathfinder lander",
    when: "Landed July 4, 1997 and worked for nearly three months",
    voice: "I'm Sojourner, the very first wheeled vehicle to work on Mars. I only weigh about 10 kilograms!",
    science: "My team and I studied rocks and soil. The data from my mission showed that Mars was once warm and wet.",
    fact: "I rode to Mars folded up inside the Pathfinder lander and rolled out after it landed."
  },
  {
    name: "Spirit", zone: "Mars", icon: "🔭", status: "silent",
    where: "Mars",
    when: "Landed January 2004 and last heard from in March 2010",
    voice: "I'm Spirit! I was built to work for 90 days, but I kept going for about six years.",
    science: "I studied the rocks and soil of Mars, looking for signs that water was once there.",
    fact: "In 2005 a dust devil blew across my solar panels and cleaned them, which helped me keep going. In the end I got stuck in a patch of soft ground hidden under the soil."
  },
  {
    name: "Opportunity", zone: "Mars", icon: "🛞", status: "silent",
    where: "Mars, on a flat plain called Meridiani Planum",
    when: "Landed January 2004 and worked for about 15 years",
    voice: "I'm Opportunity, Spirit's twin. I was built for 90 days, and I worked for about 15 years!",
    science: "I explored a plain where scientists think water may have flowed long ago, and I drove farther than any other vehicle on another world.",
    fact: "A huge dust storm covered my solar panels in 2018, and NASA ended my mission in February 2019."
  },
  {
    name: "Ingenuity", zone: "Mars", icon: "🚁", status: "silent",
    where: "Mars, still standing upright on the surface",
    when: "First flight April 2021, last flight January 2024",
    voice: "I'm Ingenuity, the first helicopter to fly on another planet. I was only supposed to fly five times.",
    science: "I proved that powered, controlled flight works on Mars, and I scouted ahead for the Perseverance rover.",
    fact: "I flew 72 times in total, about 17 kilometers and more than two hours in the air, before a rotor got damaged on landing."
  },
  {
    name: "Voyager 1", zone: "Deep Space", icon: "📡", status: "talking",
    where: "Interstellar space, the space between stars",
    when: "Launched September 5, 1977 and still sending signals",
    voice: "I'm Voyager 1, and I'm still talking to Earth! I'm the farthest human-made object from home.",
    science: "I visited Jupiter and Saturn, found a thin ring around Jupiter and new moons around Saturn, and in 2012 I crossed into interstellar space.",
    fact: "On November 18, 2026, I will be one light-day from Earth. That's about 26 billion kilometers, so a message takes a full day to reach me."
  }
];

const quiz = [
  {
    q: "What did Surveyor 3 find out about the Moon's soil?",
    options: ["It was like wet sand", "It was like ice", "It was like water", "It was too soft to land on"],
    answer: 0,
    explain: "It felt like wet sand, which was strong enough to support a lunar lander."
  },
  {
    q: "Which robot was the first wheeled vehicle on Mars?",
    options: ["Opportunity", "Sojourner", "Spirit", "Ingenuity"],
    answer: 1,
    explain: "Sojourner rolled out of the Pathfinder lander in 1997."
  },
  {
    q: "Spirit was built to work for 90 days. About how long did it work?",
    options: ["90 days", "One year", "About six years", "50 years"],
    answer: 2,
    explain: "Spirit kept working for about six years."
  },
  {
    q: "Ingenuity was designed for five flights. How many did it make?",
    options: ["5", "12", "72", "500"],
    answer: 2,
    explain: "Ingenuity flew 72 times before its rotor was damaged."
  },
  {
    q: "Which of these robots is still sending signals to Earth?",
    options: ["Viking 1", "Spirit", "Surveyor 3", "Voyager 1"],
    answer: 3,
    explain: "Voyager 1 is still talking to Earth after almost 50 years."
  }
];