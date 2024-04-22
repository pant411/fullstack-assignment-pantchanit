'use client'

import { Dispatch, SetStateAction } from "react"

const Tab = ({
  data,
  currentTab,
  handleTab
}: { data: string[], currentTab: string, handleTab: Dispatch<SetStateAction<string>> }) => {
  
  return (
    <div role="tablist" className="tabs tabs-boxed">
      {data.map((ele, idx) =>
        <a
          role="tab"
          className={`tab${currentTab === ele ? ' tab-active' : ''}`}
          onClick={() => handleTab(ele)}
          key={`tab-key-${idx}`}
        >
          {ele}
        </a>
      )}
    </div>
  )
}

export default Tab