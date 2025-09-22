import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './app/ui/Header'
import Footer from './app/ui/Footer'
import Landing from './app/pages/Landing'
import TracksPage from './app/pages/tracks/TracksPage'
import TrackDetail from './app/pages/tracks/TrackDetail'
import CommitteePage from './app/pages/committee/CommitteePage'
import SubmitIdea from './app/pages/submit/SubmitIdea'
import LoginPage from './app/pages/login/LoginPage'
import SignupPage from './app/pages/login/SignupPage'
import AccountPage from './app/pages/AccountPage'

export default function App(){
  return (
    <>
      <Header/>
      <div className="header-gap" />
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/tracks" element={<TracksPage/>} />
        <Route path="/tracks/:slug" element={<TrackDetail/>} />
        <Route path="/committee" element={<CommitteePage/>} />
        <Route path="/submit" element={<SubmitIdea/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/account" element={<AccountPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
    </>
  )
}
