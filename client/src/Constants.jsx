export const Themes = [
    { label: 'Lara Light Amber', value: 'lara-light-amber' },
    { label: 'Lara Light Blue', value: 'lara-light-blue' },
    { label: 'Lara Light Cyan', value: 'lara-light-cyan' },
    { label: 'Lara Light Green', value: 'lara-light-green' },
    { label: 'Lara Light Indigo', value: 'lara-light-indigo' },
    { label: 'Lara Light Pink', value: 'lara-light-pink'},
    { label: 'Lara Light Purple', value: 'lara-light-purple' },
    { label: 'Lara Light Teal', value: 'lara-light-teal' },
    { label: 'Lara Dark Amber', value: 'lara-dark-amber' },
    { label: 'Lara Dark Blue', value: 'lara-dark-blue' },
    { label: 'Lara Dark Cyan', value: 'lara-dark-cyan' },
    { label: 'Lara Dark Green', value: 'lara-dark-green' },
    { label: 'Lara Dark Indigo', value: 'lara-dark-indigo' },
    { label: 'Lara Dark Pink', value: 'lara-dark-pink'},
    { label: 'Lara Dark Purple', value: 'lara-dark-purple' },
    { label: 'Lara Dark Teal', value: 'lara-dark-teal' },
    { label: 'Tailwind', value: 'tailwind-light' },
    { label: 'Fluent', value: 'fluent-light' },
    { label: 'Material Light Indigo', value: 'md-light-indigo' },
    { label: 'Material Light Deep Purple', value: 'md-light-deeppurple' },
    { label: 'Material Dark Indigo', value: 'md-dark-indigo' },
    { label: 'Material Dark Deep Purple', value: 'md-dark-deeppurple' },
    { label: 'Luna Blue', value: 'luna-blue' },
    { label: 'Luna Green', value: 'luna-green' },
    { label: 'Luna Amber', value: 'luna-amber' },
    { label: 'Luna Pink', value: 'luna-pink' },
    { label: 'Nova', value: 'nova' },
    { label: 'Rhea', value: 'rhea' },
    { label: 'Saga Blue', value: 'saga-blue' },
    { label: 'Saga Green', value: 'saga-green' },
    { label: 'Saga Orange', value: 'saga-orange' },
    { label: 'Saga Purple', value: 'saga-purple' },
    { label: 'Soho Light', value: 'soho-light' },
    { label: 'Soho Dark', value: 'soho-dark' },
    { label: 'Viva Light', value: 'viva-light' },
    { label: 'Viva Dark', value: 'viva-dark' },
    { label: 'Vela Blue', value: 'vela-blue' },
    { label: 'Vela Green', value: 'vela-green' },
    { label: 'Vela Orange', value: 'vela-orange' },
    { label: 'Vela Purple', value: 'vela-purple' }
];

export const TabContents = [
    { title: 'Workout Tracking', content: 'Showcase how users can log workouts, track progress, and discover new routines.' },
    { title: 'Nutrition Logging', content: 'Explain how users can easily track their calorie intake, macros, and meals.' },
    { title: 'Progress Visualization', content: 'Highlight charting and data visualization features to show how users can see their journey.' },
  ]
  
export const Testimonials = [
    {
        image: '/user_avatar.jpg',
        name: 'John Doe',
        message: "I've tried a lot of fitness apps, but this one really stands out. I love how easy it is to track my workouts, nutrition, and progress all in one place. The charts and graphs are incredibly helpful for seeing my improvement over time. It's motivating to see how far I've come! Plus, the user interface is super clean and easy to use.",
        companytitle: 'Fitness Enthusiast'
    },
    {
        image: '/user_avatar2.png',
        name: 'Will Smith',
        message: "As a personal trainer, I need an app that can help me manage my clients' progress and provide them with the tools they need to succeed. This app does just that. The admin features are fantastic for creating custom workouts and tracking client data. It's a game-changer for my business",
        companytitle: 'Certified Personal Trainer'
    },
    {
        image: '/user_avatar3.png',
        name: 'Scarlet Morgan',
        message: "As a busy mom, finding time to stay fit can be a challenge. This app makes it so much easier! The workout templates are great for getting started, and the ability to track my meals keeps me accountable. I also love that I can share my progress with friends and get support from them. It's a great community!",
        companytitle: 'Busy Professional'
    }
]

export const FAQs = [
    {
        question: 'How Secure is my Data?',
        answer: 'Your data is secure and encrypted. We use industry-standard security measures to protect your personal information.'
    },
    {
        question: 'Can I Track My Progress?',
        answer: 'Yes! Track your weight, body measurements, and other progress metrics over time. Visualize your journey with interactive charts.'
    },
    {
        question: 'Is There a Mobile App?',
        answer: "Currently, we offer a web-based platform. We're working on expanding to mobile devices in the future!"
    },
    {
        question: 'What Types of Workouts Can I Log?',
        answer: 'Log a wide variety of workouts – strength training, cardio, yoga, and more. Track sets, reps, weight, and duration for each exercise.'
    },
    {
        question: 'Can I Customize My Nutrition Tracking?',
        answer: 'Absolutely! Log your meals, snacks, and track calories, macros, and other nutritional information. Customize your entries to fit your dietary needs.'
    }
]

export const Workouts = [
    {
        title: 'Strength Training',
        description: 'Build muscle, gain strength, and improve your overall fitness.',
        image: '/strength_training.svg'
    },
    {
        title: 'Cardio Fitness',
        description: 'Boost your endurance and cardiovascular health with our cardio workouts.',
        image: '/cardio.svg'
    },
    {
        title: 'Flexibility Training',
        description: 'Find inner peace and mindfulness through our yoga & meditation sessions.',
        image: '/flexibility_yoga.svg'
    }
]

export const Meals = [
    {
        title: 'Breakfast',
        image: '/breakfast.jpg'
    },
    {
        title: 'Lunch',
        image: '/lunch.jpg'
    },
    {
        title: 'Snacks',
        image: '/snacks.jpg'
    },
    {
        title: 'Dinner',
        image: '/dinner.jpg'
    }
]

export default {
    Themes,
    TabContents,
    Testimonials,
    FAQs,
    Workouts,
    Meals
}