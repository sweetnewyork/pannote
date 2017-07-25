import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import styled from 'styled-components'

import Store from './stores/domain'

import DashboardView from './components/dashboard-view.jsx'

const store = new Store()

const HeaderView = () => (
    <header style={{
        position: 'fixed',
        zIndex: '2',
        width: '100%'
    }}>
        <div style={{
            padding: '1rem',
            backgroundColor: '#fff',
            borderBottom: 'solid 1px #999',
            fontWeight: 'bold'
        }}>
            <p>Pannel</p>
        </div>
        <nav style={{
            padding: '1rem',
            color: '#999',
            backgroundColor: '#fff',
            borderBottom: 'solid 1px #999',
            textAlign: 'center',
            fontWeight: 'bold'
        }}>
            <h1>The pannel of the dashboard</h1>
        </nav>
    </header>
)

class App extends React.Component {
    render() {
        return <Provider store={store}>
            <div style={{ height: '100%' }}>
                <HeaderView />
                <DashboardView />
            </div>
        </Provider>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))