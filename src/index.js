import React, { Component } from 'react';
import {Stars} from 'butter-base-components';

import style from './styl/theme.styl';

let i18n = {
    __:(a) => (a)
}

class Rating extends Component {
    constructor() {
        super();

        this.state = {
            stars: true
        }
    }

    toggleStars = () => {
        this.setState ({
            stars: !!!this.state.stars
        })
    };

    render() {
        let {percentage} = this.props;

        return (
            <div className={style['shmi-rating']} onClick={this.toggleStars}>
                {this.state.stars?
                 <Stars rating={Math.round(percentage) / 20} />
                 :<div className="number-container-tv hidden">{Math.round(percentage) / 10} <em>/10</em></div>
                }
            </div>
        )
    }
}

Rating.defaultProps = {
    percentage: 0
}

let HeaderInfos = (props) => (
    <div className={style['shm-infos']}>
        <div className={style['shmi-year']}>{props.year}</div>
        <span className={style['dot']}></span>
        <div className={style['shmi-runtime']}>{props.runtime} + 'min'</div>
        <span className={style['dot']}></span>
        <div className={style['shmi-status']}>{i18n.__(props.status)}</div>
        <span className={style['dot']}></span>
        <div className={style['shmi-genre']}>{i18n.__(props.genres[0])}</div>
        <span className={style['dot']}></span>
        <div className={style['shmi-imdb']}  data-toggle="tooltip" data-placement="top" title={i18n.__('Open IMDb page')}></div>
        <span className={style['dot']}></span>
        <Rating {...props.rating}/>
    </div>
)

HeaderInfos.defaultProps = {
    year: 1970,
    runtime: 60,
    status: 'N/A',
    genres: ['N/A'],
    rating: 0
}

let HeaderActions= (props) => (
    <div className={style['sh-actions']}>
        <div className={style['sha-bookmark']}>{i18n.__('Add to bookmarks') }</div>
        <div className={style['sha-watched']}>{i18n.__('Mark as Seen') }</div>
    </div>
)

let HeaderMetadata = (props) => (
    <div className={style['sh-metadata']}>
        <div className={style['shm-title']}>{props.title}</div>
        <HeaderInfos {...props}/>
        <div className={style['shm-synopsis']}>{props.synopsis}</div>
    </div>
);

class LoadImage extends React.Component {
    static defaultProps = {
        fallbackSrc: './images/posterholder.png',
        transition: 'opacity .3s ease-in',
        opacity: 1
    };

    state = {
        loaded: this.props.loaded || false,
        error:  this.props.error  || false
    };

    render() {
        let {className, src, style, fallbackSrc, ...props} = this.props;
        let loaded = this.state.loaded || this.state.error;
        let backgroundImage =  `url(${src})`;

        style = Object.assign(style || {}, {
            backgroundImage: backgroundImage
        });

        if (this.state.error) {
            let fallback = require (fallbackSrc);
            Object.assign(style, {
                backgroundImage: `url(${fallback})`
            })
        }

        loaded && Object.assign(style, ...props);

        return (
            <div className={className} src={src} style={style}>
                <img style={{display: 'none'}} src={props.src}
                     onError={e => this.setState({error: true})}
                     onLoad={e => this.setState({loaded: true})}/>
                {props.children}
            </div>
        )
    }
}

let BackgroundCover = (props)=> (
    <div className={style['sh-background']}>
        <LoadImage className={style['shc-img']}
                   src={props.fanart}
                   fallbackSrc='./images/bg-header.jpg'/>
        {props.children}
    </div>
);

let ShowPoster = (props)=> (
    <div className={style['sh-poster']}>
        <LoadImage className={style['shp-img']}
                   src={props.poster}
                   fallbackSrc='./images/posterholder.png'/>
    </div>
);

let HeaderInfo = (props) => (
    <div className={style['sh-info']}>
        <HeaderMetadata {...props}/>
        <HeaderActions />
    </div>
)

let ShowHeader = (props) => (
    <section className={style['show-header']}>
        <BackgroundCover {...props.images}>
            <ShowPoster {...props.images}/>
            <HeaderInfo {...props}/>
        </BackgroundCover>
    </section>
);

export default ShowHeader;
