import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/ethers/react'

import { connect, logo, logout } from '@assets/index';
import { navlinks } from '@constants';
import { useNetworkContext } from '@context';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {isActive ? ( 
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${!isActive && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { open } = useWeb3Modal()
  
  const {
    isConnected
  } = useNetworkContext()

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[75vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={location.pathname == link.link}
              handleClick={() => {
                if(!link.disabled) {
                  navigate(link.link);
                }

                if(link.name == 'logout') {
                  open({ view: 'Account' })
                }

              }}
            />
          ))}
          {
            <Icon 
            key='connect'
            imgUrl={isConnected ? logout : connect}
            name='connect'
            isActive={false}
            handleClick={() => {
              isConnected ? open({ view: 'Account' }) : open({ view: 'Connect' }) ;
            }}
          />
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar