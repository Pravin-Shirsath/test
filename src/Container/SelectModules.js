import React from 'react'
import '../Assets/css/main.css'
import { Helmet } from 'react-helmet'

const SelectModules = () => {

  return (
    <div className='loginContainer'>
      <Helmet>
        <title>Automaton | Projects </title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      <div className='row justify-content-between row-gapper'>
        <div className='col loginInfoWrapper'>
          <p className='loginMeta'>Welcome you to the era of Digital Transformation......</p>
          <p className='metaDetails'>Project Planning | Upload | Visualize | Digitise | AI | Analysis </p>
        </div>
        <div className='col'>

        </div>
      </div>

    </div>
  )
}

export default SelectModules