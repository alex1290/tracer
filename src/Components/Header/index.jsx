import React, { Component, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import './Header.css'
const Header = props => {
    const { page, setPage } = props
    const handleClick = (e, { name }) => setPage(name)
    return (
        <Menu pointing secondary vertical fixed={top} >
            <Menu.Item
                name='行為資料'
                active={page === '行為資料'}
                onClick={handleClick}
            >
                行為資料
                </Menu.Item>
            <Menu.Item
                name='URL產生器'
                active={page === 'URL產生器'}
                onClick={handleClick}
            >
                URL產生器
                </Menu.Item>
            <Menu.Item
                name='產生器教學'
                active={page === '產生器教學'}
                onClick={handleClick}
            >
                產生器教學
                </Menu.Item>
        </Menu>
    )
}


export default Header;