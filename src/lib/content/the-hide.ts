/**
 * Content for The Hide page, drawn from "The Hide Website Brief" (Sept 2026).
 * Only confirmed details are included; anything the brief marks TBC (lunch
 * deal, catering prices, Square menu link, accessibility, dogs, meat/egg
 * suppliers) is left out until Squab confirms it.
 */

export const hide = {
  name: "The Hide by Squab",
  eyebrow: "Coffee • Food • Community",
  headline: "Tucked away. Worth finding.",
  intro:
    "A friendly independent café at Squab Hall Farm, serving freshly prepared breakfasts, lunches, homemade treats and great coffee in peaceful rural surroundings.",
  intro2:
    "Come for a quick coffee, stay for lunch, meet a friend, catch up on work or simply find a quiet corner for a while. However you arrive, you’ll find a genuine welcome.",

  address: ["Squab Hall Farm", "Harbury Lane", "Leamington Spa", "CV33 9QB"],
  directions: "Just a short distance from Junction 14 of the M40, with free parking on site.",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Hide+Squab+Hall+Farm+Harbury+Lane+Leamington+Spa+CV33+9QB",
  email: "thehide@squab.co.uk",
  phone: "07939 411269",

  hours: [
    { when: "Monday–Friday", time: "8.30am–3pm" },
    { when: "Saturday", time: "10am–2pm" },
    { when: "Sunday", time: "Closed" },
  ],

  pillars: [
    {
      title: "Wholesome & fresh",
      body: "Breakfasts, lunches, lighter choices, homemade cakes and everyday favourites — freshly prepared and made to be enjoyed.",
    },
    {
      title: "Proud to buy British",
      body: "We choose British and independent suppliers wherever we can, from farm-fresh Warwickshire milk to preserves made in Bristol and soft drinks with Cornish roots.",
    },
    {
      title: "A genuine welcome",
      body: "On your own, with friends, meeting a client, walking in from the Squab site or visiting from the local community — there’s a place for you here.",
    },
  ],

  story: [
    "The Hide sits at the heart of Squab Hall Farm — a family-run farm that has adapted and diversified over generations since the Evans family arrived in 1933.",
    "The café itself is anything but off the shelf. Created from two converted 20ft containers, it has grown into a characterful place surrounded by flowers, greenery and the everyday life of the farm. Just behind it, The Hideaway — made with reclaimed materials — is a warm, creative space designed for people to gather.",
  ],

  suppliers: [
    { name: "Harbury Milk Shed", body: "Farm-produced milk from their own herd in Harbury, Warwickshire — fresh, pasteurised and supplied in reusable glass bottles." },
    { name: "Harbury Honey", body: "Gathered from the Warwickshire countryside by the bees of Joe Van Hoorebeek of Harbury." },
    { name: "Gingerbeard’s Preserves", body: "Independent, family-run producers in Bristol making sauces, chutneys, pickles and preserves in small batches." },
    { name: "Jolly’s Drinks", body: "An independent Cornish soft drinks company with roots dating back to 1896, using natural Cornish spring water." },
  ],

  menu: [
    {
      title: "Breakfast",
      when: "Mon–Fri until 11am",
      items: ["Breakfast baps and wraps", "Bacon or sausage baps", "Eggs, beans and toast", "Vegetarian and lighter choices"],
    },
    {
      title: "Lunch",
      when: "Mon–Fri 11am–3pm",
      items: ["Sandwiches, toasties and filled baps", "Baked potatoes", "Fresh salads, including vegan choices", "Seasonal soup and daily specials"],
    },
    {
      title: "Drinks",
      when: "All day",
      items: ["Espresso-based coffees", "Teas, chai and dirty chai", "Iced coffee, smoothies and milkshakes", "Alternative milks and syrups"],
    },
    {
      title: "Cakes & treats",
      when: "All day",
      items: ["Homemade and locally sourced cakes", "Seasonal favourites", "Something tempting on the counter, always"],
    },
  ],

  cafeOffers: [
    { label: "Buy 5 hot drinks, get your 6th free", detail: "Pick up a loyalty card in the café." },
    { label: "10% off with a reusable cup", detail: "Bring your own cup for any drink." },
  ],

  spaces: [
    {
      title: "Catering",
      body: "Freshly prepared buffet catering for businesses, sports clubs, schools and community groups — from a light bite to a full spread, with fresh, vegetarian and vegan choices built in.",
      facts: ["Light bite, working lunch or full spread"],
      cta: "Ask about catering",
      subject: "Catering enquiry",
    },
    {
      title: "The Hideaway",
      body: "A cosy, characterful private room just behind the café, made with reclaimed materials. Ideal for birthdays, charity mornings, club gatherings, workshops and small celebrations.",
      facts: ["Up to 25 people", "From £50 for 2 hours", "Room + Hide buffet from £15 per person (10–25 people)"],
      cta: "Enquire about The Hideaway",
      subject: "Hideaway enquiry",
    },
    {
      title: "Squab Conference Room",
      body: "For meetings, workshops and training at Squab Hall Farm, with WiFi, projector, whiteboard, free parking and tea & coffee included — and catering from The Hide.",
      facts: ["Up to 20 boardroom-style", "Up to 40 theatre-style"],
      cta: "Enquire about the conference room",
      subject: "Conference room enquiry",
    },
  ],

  values: ["Authentic", "Provenance", "Good value", "Creative", "Natural", "Healthy", "Welcoming"],
};
