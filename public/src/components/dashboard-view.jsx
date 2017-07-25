import React from 'react'

import IconView from './icon-view.jsx'
import CanvasView from './canvas-view.jsx'

class DashboardView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div style={{ height: '100%' }}>
            <aside style={{ position: 'fixed', zIndex: '1', left: '0', width: '4rem', height: '100%' }}>
                <div style={{ paddingTop: '6rem' }}>
                    {
                        [
                            'fa fa-sticky-note fa-2x',
                            'fa fa-file-image-o fa-2x',
                            'fa fa-external-link-square fa-2x',
                            'fa fa-columns fa-2x',
                            'fa fa-folder fa-2x',
                            'fa fa-long-arrow-right fa-2x',
                            'fa fa-trash fa-2x'
                        ].map((className, index) => (
                            <IconView key={index}>
                                <i className={className}></i>
                            </IconView>
                        ))
                    }
                </div>
            </aside>
            <article style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
                <CanvasView></CanvasView>
            </article>
        </div>
    }
}

export default DashboardView