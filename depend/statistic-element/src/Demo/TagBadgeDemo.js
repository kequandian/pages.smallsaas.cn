import React from 'react';
import TagBadge from '../components/tagBadge/TagBadge'

const TagBadgeDemo  = ({


}) => {

  const tagBadgeProps = {
    list: [
      {
        'tag': '读经随笔',
        'badge': 1024
      },
      {
        'tag': '主日备忘',
        'badge': 70
      },
      {
        'tag': '祷告默想',
        'badge': 80
      },
    ],
  }

  return (
    <div>
      <TagBadge {...tagBadgeProps}/>
    </div>
  )
}

export default TagBadgeDemo
