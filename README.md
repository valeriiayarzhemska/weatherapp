# WeatherApp

WeatherApp is a mobile application built using React Native, Expo, TypeScript, and NativeWind for styling. It allows users to check the weather forecast based on their location using the OpenWeatherMap API. User preferences are stored using AsyncStorage.

## Features

- View current weather conditions and forecast for the user's location.
- Fetch weather data from the OpenWeatherMap API.
- Styling using NativeWind for a consistent look and feel.
- Store user preferences and location data using AsyncStorage.

## Getting Started

These instructions will help you set up and run the WeatherApp on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager)
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/valeriiayarzhemska/weatherapp.git
cd weatherapp
```

Install dependencies:

```bash
npm install
```

Create a .env file in the root directory of the project and add your OpenWeatherMap API key:

```bash
BASE_URL=your_openweathermap_base_url
API_KEY=your_openweathermap_api_key
```

### Running the App

Start the development server for web:

```bash
npm run dev
```

### Tech Stack

- React Native
- Expo
- TypeScript
- NativeWind
- AsyncStorage

### Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.
