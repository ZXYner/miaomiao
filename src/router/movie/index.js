export default {
    path: '/movie',
    component: () =>
        import ('@/views/Movie'),
    children: [{
            //不用添加斜杠，表示相对路劲，如果添加斜杠要写为/movie/city表示用绝对路径
            path: 'city',
            component: () =>
                import ('@/components/City')
        },
        {
            path: 'nowplaying',
            component: () =>
                import ('@/components/NowPlaying')
        },
        {
            path: 'comingsoon',
            component: () =>
                import ('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () =>
                import ('@/components/Search')
        },
        {
            path: '/movie',
            redirect: '/movie/nowplaying'
        }
    ]
}