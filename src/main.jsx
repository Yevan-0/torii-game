import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { useGLTF } from '@react-three/drei'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
