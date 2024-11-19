import React from "react"
import CragList from "../components/CragList"
import CreateCragForm from "../components/CreateCragForm"

const CragPage: React.FC = () => {
  return (
    <div>
      <h1>Crags</h1>
      <CreateCragForm />
      <CragList />
    </div>
  )
}

export default CragPage