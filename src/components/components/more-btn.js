'use client'

import { memo } from 'react'
import { MdArrowForwardIos } from 'react-icons/md'

function MoreBtn({ title = '名稱', onClick = () => {} }) {
  return (
    <button className="text-[#007aff] text-base flex items-center" onClick={onClick}>
      <span>{title}</span>
      <div className="flex items-center justify-center p-1">
        <MdArrowForwardIos />
      </div>
    </button>
  )
}

export default memo(MoreBtn)
