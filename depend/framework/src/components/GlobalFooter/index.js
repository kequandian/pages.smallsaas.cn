import React from 'react';
import classNames from 'classnames';
import './index.css';

export default ({ className, links, copyright }) => {
  const clsString = classNames('global-footer', className);
  return (
    <div className={clsString}>
      {
        links && (
          <div className='global-footer-links'>
            {links.map(link => (
              <a
                key={link.key}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )
      }
      {copyright && <div className='global-footer-copyright'>{copyright}</div>}
    </div>
  );
};
