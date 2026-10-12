import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DiaryPage } from './pages/DiaryPage';
import { AddFoodPage } from './pages/AddFoodPage';
import { FoodDetailPage } from './pages/FoodDetailPage';
import { InsightsPage } from './pages/InsightsPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { Layout } from './components/Layout';
import { DEFAULT_USER, DEMO_LOGS } from './data';
import { FoodLog, Food, UserProfile } from './types';
import { persistLocalStorage, readLocalStorage, todayIso } from './utils';

export default function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile>(
    readLocalStorage('user', { ...DEFAULT_USER, onboardingComplete: false })
  );

  const [logs, setLogs] = useState<FoodLog[]>(
    readLocalStorage('foodLogs', DEMO_LOGS)
  );

  const [selectedDate, setSelectedDate] = useState(todayIso());

  const updateUser = (next: Partial<UserProfile>) => {
    const updated = { ...user, ...next };
    setUser(updated);
    persistLocalStorage('user', updated);
  };

  const addFoodLog = (log: FoodLog) => {
    const updated = [...logs, log];
    setLogs(updated);
    persistLocalStorage('foodLogs', updated);
  };

  const updateFoodLog = (log: FoodLog) => {
    const updated = logs.map((entry) => (entry.id === log.id ? log : entry));
    setLogs(updated);
    persistLocalStorage('foodLogs', updated);
  };

  const deleteFoodLog = (id: string) => {
    const updated = logs.filter((entry) => entry.id !== id);
    setLogs(updated);
    persistLocalStorage('foodLogs', updated);
  };

  const saveFavorite = (food: Food) => {
    console.log('Saved to favorites:', food.name);
  };

  const handleQuickAdd = (meal: any) => {
    navigate(`/add-food?meal=${meal}`);
  };

  const handleEditLog = (id: string) => {
    navigate(`/food?edit=${id}`);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/auth"
          element={
            <AuthPage
              onAuthenticate={(email, password) => {
                console.log('Authenticated:', email);
                updateUser({ email });
              }}
              onDemoMode={() => {
                updateUser({ onboardingComplete: true });
              }}
            />
          }
        />
        <Route
          path="/onboarding"
          element={<OnboardingPage user={user} onUpdateUser={updateUser} />}
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              user={user}
              logs={logs}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onDeleteLog={deleteFoodLog}
              onEditLog={handleEditLog}
              onQuickAdd={handleQuickAdd}
            />
          }
        />
        <Route
          path="/diary"
          element={
            <DiaryPage
              user={user}
              logs={logs}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onDeleteLog={deleteFoodLog}
              onEditLog={handleEditLog}
              onQuickAdd={handleQuickAdd}
            />
          }
        />
        <Route path="/add-food" element={<AddFoodPage />} />
        <Route
          path="/food/:foodId"
          element={
            <FoodDetailPage
              user={user}
              logs={logs}
              onAddLog={addFoodLog}
              onUpdateLog={updateFoodLog}
              onSaveFavorite={saveFavorite}
            />
          }
        />
        <Route
          path="/food"
          element={
            <FoodDetailPage
              user={user}
              logs={logs}
              onAddLog={addFoodLog}
              onUpdateLog={updateFoodLog}
              onSaveFavorite={saveFavorite}
            />
          }
        />
        <Route
          path="/insights"
          element={<InsightsPage user={user} logs={logs} />}
        />
        <Route
          path="/progress"
          element={<ProgressPage user={user} logs={logs} />}
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              user={user}
              onUpdateUser={updateUser}
              logs={logs}
              onClearLogs={() => {
                setLogs([]);
                persistLocalStorage('foodLogs', []);
              }}
            />
          }
        />
      </Routes>
    </Layout>
  );
}
