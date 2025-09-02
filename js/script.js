// 数据
const buddingData = {
    years: [1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923],
    films: [1, 0, 0, 0, 1, 0, 1, 3, 1, 2, 3, 2, 4, 3, 5, 3, 3, 4, 7]
};

const explorationData = {
    years: [1923, 1924, 1925, 1926, 1927],
    films: [15, 35, 48, 54, 48]
};

const competitionData = {
    years: [1928, 1929, 1930, 1931],
    films: [97, 130, 120, 53]
};

const changeData = {
    years: [1932, 1933, 1934, 1935, 1936, 1937],
    films: [43, 70, 68, 45, 58, 85]
};

const warData = {
    years: [1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945],
    films: [58, 94, 199, 257, 164, 70, 58, 47, 35]
};

const afterwarData = {
    years: [1945, 1946, 1947, 1948, 1949],
    films: [5, 40, 150, 170, 10]
};

const seventeenData = {
    years: [1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966],
    films: [8, 13, 16, 12, 13, 19, 26, 42, 37, 110, 68, 58, 33, 37, 42, 32, 26, 11]
};

// 词云数据
const buddingWords = [
    { text: '戏曲', size: 'large', fontSize: '2.2rem' },
    { text: '纪录', size: 'large', fontSize: '1.9rem' },
    { text: '短片', size: 'large', fontSize: '2.0rem' },
    { text: '家庭', size: 'medium', fontSize: '1.6rem' },
    { text: '伦理', size: 'medium', fontSize: '1.7rem' },
    { text: '喜剧', size: 'medium', fontSize: '1.5rem' },
    { text: '婚姻', size: 'medium', fontSize: '1.4rem' },
    { text: '爱情', size: 'medium', fontSize: '1.5rem' },
    { text: '犯罪', size: 'medium', fontSize: '1.3rem' },
    { text: '舞台', size: 'small', fontSize: '1.2rem' },
    { text: '京剧', size: 'small', fontSize: '1.1rem' },
    { text: '闹剧', size: 'small', fontSize: '1.0rem' },
    { text: '滑稽', size: 'small', fontSize: '1.1rem' },
    { text: '文明戏', size: 'small', fontSize: '0.9rem' },
    { text: '实事', size: 'small', fontSize: '1.0rem' }
];

const explorationWords = [
    { text: '家庭', size: 'large', fontSize: '2.3rem' },
    { text: '伦理', size: 'large', fontSize: '2.0rem' },
    { text: '爱情', size: 'large', fontSize: '2.1rem' },
    { text: '教化', size: 'medium', fontSize: '1.8rem' },
    { text: '娱乐', size: 'medium', fontSize: '1.6rem' },
    { text: '妇女', size: 'medium', fontSize: '1.5rem' },
    { text: '遗产', size: 'medium', fontSize: '1.4rem' },
    { text: '悲剧', size: 'medium', fontSize: '1.5rem' },
    { text: '喜剧', size: 'medium', fontSize: '1.6rem' },
    { text: '闹剧', size: 'small', fontSize: '1.3rem' },
    { text: '民间故事', size: 'small', fontSize: '1.1rem' },
    { text: '古装', size: 'small', fontSize: '1.2rem' },
    { text: '社会问题', size: 'small', fontSize: '1.0rem' },
    { text: '欧化', size: 'small', fontSize: '1.1rem' },
    { text: '潜移默化', size: 'small', fontSize: '0.9rem' },
    { text: '侨资', size: 'small', fontSize: '1.0rem' }
];

const competitionWords = [
    { text: '武侠', size: 'large', fontSize: '2.3rem' },
    { text: '神怪', size: 'large', fontSize: '2.0rem' },
    { text: '复仇', size: 'large', fontSize: '2.1rem' },
    { text: '剑侠', size: 'large', fontSize: '1.8rem' },
    { text: '冒险', size: 'large', fontSize: '1.6rem' },
    { text: '江湖', size: 'medium', fontSize: '1.5rem' },
    { text: '侠女', size: 'medium', fontSize: '1.4rem' },
    { text: '奇观', size: 'medium', fontSize: '1.5rem' },
    { text: '特效', size: 'medium', fontSize: '1.6rem' },
    { text: '爱情', size: 'medium', fontSize: '1.3rem' },
    { text: '伦理', size: 'medium', fontSize: '1.4rem' },
    { text: '机关布景', size: 'small', fontSize: '1.1rem' },
    { text: '粗制滥造', size: 'small', fontSize: '1.0rem' },
    { text: '票房', size: 'small', fontSize: '1.1rem' },
    { text: '跟风', size: 'small', fontSize: '0.9rem' },
    { text: '商业', size: 'small', fontSize: '1.0rem' },
    { text: '火烧', size: 'small', fontSize: '1.1rem' },
    { text: '查禁', size: 'small', fontSize: '0.8rem' }
];

const changeWords = [
    { text: '阶级', size: 'large', fontSize: '2.3rem' },
    { text: '压迫', size: 'large', fontSize: '2.0rem' },
    { text: '抗战', size: 'large', fontSize: '2.1rem' },
    { text: '救亡', size: 'large', fontSize: '1.8rem' },
    { text: '女性', size: 'large', fontSize: '1.6rem' },
    { text: '苦难', size: 'large', fontSize: '1.6rem' },
    { text: '觉醒', size: 'large', fontSize: '1.9rem' },
    { text: '工人', size: 'medium', fontSize: '1.3rem' },
    { text: '农民', size: 'medium', fontSize: '1.6rem' },
    { text: '知识分子', size: 'medium', fontSize: '1.4rem' },
    { text: '都市', size: 'medium', fontSize: '1.4rem' },
    { text: '黑暗', size: 'medium', fontSize: '1.3rem' },
    { text: '光明', size: 'medium', fontSize: '1.2rem' },
    { text: '抗争', size: 'medium', fontSize: '1.6rem' },
    { text: '现实主义', size: 'medium', fontSize: '1.7rem' },
    { text: '蒙太奇', size: 'small', fontSize: '1.0rem' },
    { text: '声画结合', size: 'medium', fontSize: '1.5rem' },
    { text: '主题曲', size: 'small', fontSize: '0.8rem' },
    { text: '国防', size: 'small', fontSize: '1.0rem' },
    { text: '音乐', size: 'small', fontSize: '1.1rem' }
];

const warWords = [
    { text: '抗战', size: 'large', fontSize: '2.3rem' },
    { text: '爱国', size: 'large', fontSize: '2.0rem' },
    { text: '牺牲', size: 'large', fontSize: '2.1rem' },
    { text: '英雄', size: 'large', fontSize: '1.8rem' },
    { text: '古装', size: 'large', fontSize: '1.6rem' },
    { text: '纪录片', size: 'large', fontSize: '1.6rem' },
    { text: '士兵', size: 'medium', fontSize: '1.9rem' },
    { text: '游击队', size: 'medium', fontSize: '1.3rem' },
    { text: '女性', size: 'medium', fontSize: '1.6rem' },
    { text: '历史', size: 'medium', fontSize: '1.4rem' },
    { text: '隐喻', size: 'medium', fontSize: '1.4rem' },
    { text: '爱情', size: 'medium', fontSize: '1.3rem' },
    { text: '家庭', size: 'medium', fontSize: '1.2rem' },
    { text: '生产', size: 'medium', fontSize: '1.6rem' },
    { text: '边区', size: 'medium', fontSize: '1.7rem' },
    { text: '租界', size: 'small', fontSize: '1.0rem' },
    { text: '轰炸', size: 'small', fontSize: '1.5rem' },
    { text: '胶片', size: 'small', fontSize: '0.8rem' },
    { text: '物资匮乏', size: 'small', fontSize: '1.0rem' },
    { text: '满映', size: 'small', fontSize: '0.7rem' },
    { text: '新闻片', size: 'small', fontSize: '1.1rem' }
];

const afterwarWords = [
    { text: '批判', size: 'large', fontSize: '2.3rem' },
    { text: '腐败', size: 'large', fontSize: '2.0rem' },
    { text: '苦难', size: 'large', fontSize: '2.1rem' },
    { text: '幻灭', size: 'large', fontSize: '1.8rem' },
    { text: '人性', size: 'large', fontSize: '2.1rem' },
    { text: '伦理', size: 'large', fontSize: '1.6rem' },
    { text: '家庭', size: 'large', fontSize: '1.9rem' },
    { text: '内战', size: 'medium', fontSize: '1.3rem' },
    { text: '通货膨胀', size: 'medium', fontSize: '1.6rem' },
    { text: '劫收', size: 'medium', fontSize: '1.4rem' },
    { text: '小市民', size: 'medium', fontSize: '1.4rem' },
    { text: '知识分子', size: 'medium', fontSize: '1.3rem' },
    { text: '迷茫', size: 'medium', fontSize: '1.3rem' },
    { text: '挣扎', size: 'medium', fontSize: '1.6rem' },
    { text: '史诗', size: 'small', fontSize: '1.7rem' },
    { text: '长镜头', size: 'small', fontSize: '1.0rem' },
    { text: '心理叙事', size: 'small', fontSize: '1.5rem' },
    { text: '抒情', size: 'small', fontSize: '1.3rem' },
    { text: '讽刺喜剧', size: 'small', fontSize: '1.0rem' }
];

const seventeenWords = [
    { text: '革命', size: 'large', fontSize: '2.3rem' },
    { text: '英雄', size: 'large', fontSize: '2.0rem' },
    { text: '斗争', size: 'large', fontSize: '2.1rem' },
    { text: '爱国', size: 'large', fontSize: '1.8rem' },
    { text: '集体', size: 'large', fontSize: '2.1rem' },
    { text: '劳动', size: 'large', fontSize: '1.6rem' },
    { text: '工农兵', size: 'large', fontSize: '1.9rem' },
    { text: '牺牲', size: 'medium', fontSize: '1.3rem' },
    { text: '奉献', size: 'medium', fontSize: '1.6rem' },
    { text: '建设', size: 'medium', fontSize: '1.4rem' },
    { text: '农村', size: 'medium', fontSize: '1.4rem' },
    { text: '工厂', size: 'medium', fontSize: '1.3rem' },
    { text: '阶级斗争', size: 'medium', fontSize: '1.3rem' },
    { text: '人民', size: 'medium', fontSize: '1.6rem' },
    { text: '胜利', size: 'medium', fontSize: '1.7rem' },
    { text: '光明', size: 'medium', fontSize: '1.9rem' },
    { text: '青春', size: 'small', fontSize: '1.2rem' },
    { text: '爱情', size: 'small', fontSize: '1.3rem' },
    { text: '忠诚', size: 'small', fontSize: '1.0rem' },
    { text: '信念', size: 'small', fontSize: '1.5rem' },
    { text: '理想', size: 'small', fontSize: '1.3rem' },
    { text: '奋斗', size: 'small', fontSize: '1.0rem' },
    { text: '社会主义', size: 'small', fontSize: '1.5rem' }
];
// 萌芽期旭日图数据
const buddingSunburstData = {
    name: "root",
    children: [
        {
            name: "戏曲纪录片",
            value: 15,
        },
        {
            name: "原创故事片",
            children: [
                {
                    name: "短片",
                    children: [
                        { name: "滑稽戏剧", value: 15 },
                        { name: "社会家庭伦理", value: 4 }
                    ]
                },
                {
                    name: "长片",
                    children: [
                        { name: "社会家庭伦理", value: 2 },
                        { name: "犯罪纪实", value: 6 }
                    ]
                }
            ]
        }
    ]
};

// 探索期旭日图数据
const explorationSunburstData = {
    name: "root",
    children: [
        {
            name: "短片",
            children: [
                { name: "通俗娱乐", value: 20 },
                { name: "艺术探索", value: 36 }
            ],
        },
        {
            name: "长片",
            children: [
                { name: "通俗娱乐", value: 47 },
                {
                    name: "艺术探索",
                    children: [
                        { name: "社会家庭伦理", value: 52 },
                        { name: "稗史古装片", value: 26 },
                        { name: "文艺片", value: 6 }
                    ]
                }
            ]
        }
    ]
};


// 竞争期旭日图数据
const competitionSunburstData = {
    name: "root",
    children: [
        {
            name: "短片",
            children: [
                {
                    name: "通俗娱乐",
                    children: [
                        { name: "家庭伦理", value: 8 },
                        { name: "喜剧", value: 5 },
                        { name: "爱情", value: 3 }
                    ]
                }
            ]
        },
        {
            name: "长片",
            children: [
                {
                    name: "艺术探索",
                    children: [
                        { name: "社会家庭伦理", value: 52 },
                        { name: "稗史古装片", value: 40 },
                        { name: "文艺片", value: 20 },
                        { name: "纪录片", value: 2 }
                    ]
                },
                {
                    name: "通俗娱乐",
                    children: [
                        { name: "武侠神怪片", value: 280 },
                        { name: "喜剧", value: 10 }
                    ]
                }
            ]
        }
    ]
};

// 变革期旭日图数据
const changeSunburstData = {
    name: "root",
    children: [
        {
            name: "无声",
            children: [
                {
                    name: "严肃电影",
                    children: [
                        { name: "社会批判", value: 56 },
                        { name: "抗战国防", value: 35 },
                        { name: "进步文艺", value: 28 }
                    ]
                },
                {
                    name: "商业娱乐",
                    children: [
                        { name: "爱情", value: 11 },
                        { name: "喜剧", value: 7 },
                        { name: "家庭", value: 3 }
                    ]
                }
            ]
        },
        {
            name: "有声",
            children: [
                {
                    name: "严肃电影",
                    children: [
                        { name: "社会批判", value: 96 },
                        { name: "抗战国防", value: 60 },
                        { name: "进步文艺", value: 48 }
                    ]
                },
                {
                    name: "商业娱乐",
                    children: [
                        { name: "爱情", value: 28 },
                        { name: "喜剧", value: 10 },
                        { name: "家庭", value: 8 }
                    ]
                }
            ]
        }
    ]
};

// 抗战期旭日图数据
const warSunburstData = {
    name: "root",
    children: [
        {
            name: "上海孤岛",
            children: [
                {name: "古装",value: 120,},
                {
                    name: "时装",
                    children: [
                        {name: "爱情", value: 24 },
                        {name: "喜剧", value: 12 },
                        {name: "恐怖", value: 5 },
                        {name: "社会批判", value: 28 },
                        {name: "文艺", value: 11 }
                    ]
                }
            ]
        },
        {
            name: "日伪满映",
            children: [
                {name: "故事片", value: 108,},
                {
                    name: "其它",
                    children: [
                        {name: "日伪宣传", value: 507 },
                        {name: "时事新闻", value: 28 }
                    ]
                }
            ]
        },
        {
            name: "国统区",
            children: [
                {name: "抗战宣传", value: 94},
                {name: "社会现实",value: 36 }
            ]
        },
        {
            name: "延安根据地",
            children: [
                {name: "新闻纪录片", value: 12, },
                {
                    name: "其它",
                    children: [
                        { name: "舞台剧", value: 3 },
                        { name: "纪录片", value: 4 }
                    ]
                }
            ]
        }
    ]
};

// 战后旭日图数据
const afterwarSunburstData = {
    name: "root",
    children: [
        {
            name: "彩色",
            children: [
                {
                    name: "京剧",
                    children: [
                        {name: "生死恨", value: 1 }
                    ]
                }
            ]
        },

        {
            name: "黑白",
            children: [
                    { name: "社会批判", value: 131,},
                    { name: "人文伦理", value: 113,},
                    { name: "商业娱乐", value: 113,},
                    { name: "其它", value: 18}
            ]
        }
    ]
};

// 十七年旭日图数据
const seventeenSunburstData = {
    name: "root",
    children: [
        {
            name: "彩色",
            children: [
                {
                    name: "革命历史",
                    value: 7,
                    children: [
                        {name: "战争", value: 15 }
                    ]
                },
                {
                    name: "现实生活",
                    value: 6,
                    children: [
                        {name: "工农兵", value: 9 }
                    ]
                },
                {
                    name: "惊悚",
                    value: 4,
                    children: [
                        {name: "反特", value: 2 }
                    ]
                },
                {
                    name: "现实主义",
                    value: 7,
                    children: [
                        {name: "文学名著改编", value: 4 }
                    ]
                },
                { name: "少数民族题材", value: 6, },
                {
                    name: "其它",
                    value: 2,
                    children: [
                        {name: "戏曲", value: 1 }
                    ]
                }
            ]
        },
        {
            name: "黑白",
            children: [
                {
                    name: "革命历史",
                    value: 87,
                    children: [
                        {name: "战争", value: 102 }
                    ]
                },
                {
                    name: "现实生活",
                    value: 73,
                    children: [
                        {name: "工农兵", value: 62 }
                    ]
                },
                {
                    name: "惊悚",
                    value: 40,
                    children: [
                        {name: "反特", value: 14 }
                    ]
                },
                {
                    name: "现实主义",
                    value: 64,
                    children: [
                        {name: "文学名著改编", value: 17 }
                    ]
                },
                { name: "少数民族题材", value: 54, },
                {
                    name: "其它",
                    value: 10,
                    children: [
                        {name: "戏曲", value: 17 }
                    ]
                }
            ]
        }
    ]
};

// 切换时期显示
function showPeriod(period) {
    // 移除所有活动状态
    document.querySelectorAll('.period-button').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.period-data').forEach(data => {
        data.classList.remove('active');
    });
    document.querySelectorAll('.intro-content').forEach(intro => {
        intro.classList.remove('active');
    });

    // 激活选中的时期
    event.target.closest('.period-button').classList.add('active');
    document.getElementById(period + '-data').classList.add('active');
    document.getElementById(period + '-intro').classList.add('active');
}

// 创建萌芽期图表
function createBuddingChart() {
    const ctx = document.getElementById('budding-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: buddingData.years,
            datasets: [{
                label: '电影数量',
                data: buddingData.films,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#4a90e2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4a90e2',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} 部电影`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}

// 创建探索期图表
function createExplorationChart() {
    const ctx = document.getElementById('exploration-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: explorationData.years,
            datasets: [{
                label: '电影数量',
                data: explorationData.films,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#4a90e2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4a90e2',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} 部电影`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}

// 创建竞争期图表
function createCompetitionChart() {
    const ctx = document.getElementById('competition-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: competitionData.years,
            datasets: [{
                label: '电影数量',
                data: explorationData.films,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#4a90e2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4a90e2',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} 部电影`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}

// 创建变革期图表
function createChangeChart() {
    const ctx = document.getElementById('change-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: changeData.years,
            datasets: [{
                label: '电影数量',
                data: changeData.films,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#4a90e2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4a90e2',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} 部电影`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}

// 创建抗战期图表
function createWarChart() {
    const ctx = document.getElementById('war-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: warData.years,
            datasets: [{
                label: '电影数量',
                data: warData.films,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#4a90e2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4a90e2',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} 部电影`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}

// 创建战后图表
function createAfterwarChart() {
    const ctx = document.getElementById('afterwar-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: afterwarData.years,
            datasets: [{
                label: '电影数量',
                data: afterwarData.films,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#4a90e2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4a90e2',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} 部电影`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}

// 创建17图表
function createSeventeenChart() {
    const ctx = document.getElementById('seventeen-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: seventeenData.years,
            datasets: [{
                label: '电影数量',
                data: seventeenData.films,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#4a90e2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4a90e2',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} 部电影`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}


// 创建旭日图
function createSunburst(containerId, data) {
    const container = document.getElementById(containerId);
    const width = 480;
    const height = 480;
    const radius = Math.min(width, height) / 2;

    // 清空容器
    container.innerHTML = '';

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 分区布局
    const partition = d3.partition()
        .size([2 * Math.PI, radius]);

    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    partition(root);

    // 弧生成器
    const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1);

    // 绘制弧形
    const arcs = g.selectAll("path")
        .data(root.descendants().filter(d => d.depth > 0))
        .enter().append("path")
        .attr("class", "sunburst-arc")
        .attr("d", arc)
        .attr("fill", (d, i) => {
            // 根据层级和位置分配颜色
            const colors = ['#EFD1B6', '#FF9796', '#D3E2B9', '#348274', '#E7926B', '#90967C', '#721215', '#E8CF8D','#912D23'];
            const depthColors = {
                1: ['#C63930', '#ECCD94', '#912D23', '#6D7077'],  // 第一层：蓝色和绿色
                2: ['#AA5063', '#822521', '#E7926B', '#D3E2B9', '#D87189', '#972235'],  // 第二层：红、橙、紫、青
                3: ['#348274', '#FF9796', '#DF927E', '#66A091','#E0CD93', '#E8CF8D']   // 第三层：粉、蓝绿、灰、黄
            };
            const levelColors = depthColors[d.depth] || colors;
            return levelColors[i % levelColors.length];
        })
        .attr("stroke", "#000")
        .attr("stroke-width", 2)
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.8);
            // 显示提示信息
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background", "rgba(0,0,0,0.8)")
                .style("color", "white")
                .style("padding", "8px 12px")
                .style("border-radius", "4px")
                .style("font-size", "12px")
                .style("pointer-events", "none")
                .style("z-index", "1000")
                .html(`${d.data.name}: ${d.value}部`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", function(event, d) {
            d3.select(this).attr("opacity", 1);
            d3.selectAll(".tooltip").remove();
        });

    // 添加文本标签
    g.selectAll("text")
        .data(root.descendants().filter(d => d.depth > 0 && d.y1 - d.y0 > 25))
        .enter().append("text")
        .attr("class", "sunburst-text")
        .attr("transform", d => {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("font-size", d => {
            const arcWidth = d.y1 - d.y0;
            const arcAngle = d.x1 - d.x0;
            
            // 根据弧宽度和角度动态调整字体大小
            if (arcWidth > 60 && arcAngle > 0.3) return "12px";
            if (arcWidth > 40 && arcAngle > 0.2) return "10px";
            if (arcWidth > 25 && arcAngle > 0.15) return "9px";
            return "8px";
        })
        .text(d => {
            const arcWidth = d.y1 - d.y0;
            const arcAngle = d.x1 - d.x0;
            
            // 根据弧形空间计算最大字符数
            let maxLength;
            if (arcWidth > 60 && arcAngle > 0.4) maxLength = 10;
            else if (arcWidth > 40 && arcAngle > 0.3) maxLength = 8;
            else if (arcWidth > 30 && arcAngle > 0.2) maxLength = 6;
            else if (arcWidth > 25 && arcAngle > 0.15) maxLength = 4;
            else maxLength = 3;
            
            return d.data.name.length > maxLength ? 
                   d.data.name.substring(0, maxLength) + '...' : 
                   d.data.name;
        });
}

// 创建随机分布的词云
function createWordCloud(containerId, words) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    // 生成词语元素
    words.forEach((word, index) => {
        const wordElement = document.createElement('span');
        wordElement.className = `word-item word-${word.size}`;
        wordElement.textContent = word.text;
        
        // 设置自定义字体大小
        if (word.fontSize) {
            wordElement.style.fontSize = word.fontSize;
        }
        
        // 添加随机颜色变化
        const opacity = 0.8 + Math.random() * 0.2; // 0.8-1.0之间的透明度
        wordElement.style.opacity = opacity;
        
        // 随机位置（避免重叠）
        let x, y, attempts = 0;
        do {
            x = Math.random() * 3; // 10%-80%的水平位置
            y = -5+Math.random() * 30; // 15%-75%的垂直位置
            attempts++;
        } while (attempts < 10 && isOverlapping(x, y, word.size, container));
        
        wordElement.style.left = x + '%';
        wordElement.style.top = y + '%';
        wordElement.style.transform = `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 20}deg)`;
        
        // 随机动画延迟
        const delay = Math.random() * 1.5 + index * 0.1;
        wordElement.style.animationDelay = delay + 's';
        
        // 添加交互事件
        addWordInteraction(wordElement);
        
        container.appendChild(wordElement);
    });
}

// 检查词语位置是否重叠
function isOverlapping(x, y, size, container) {
    const existingWords = container.querySelectorAll('.word-item');
    const threshold = size === 'large' ? 15 : size === 'medium' ? 12 : 10;
    
    for (let word of existingWords) {
        const wordX = parseFloat(word.style.left);
        const wordY = parseFloat(word.style.top);
        const distance = Math.sqrt(Math.pow(x - wordX, 2) + Math.pow(y - wordY, 2));
        if (distance < threshold) {
            return true;
        }
    }
    return false;
}

// 为词语添加交互效果
function addWordInteraction(wordElement) {
    wordElement.addEventListener('mouseenter', function() {
        const randomRotate = (Math.random() - 0.5) * 12; // -6到6度之间
        const scaleValue = this.classList.contains('word-large') ? 1.2 : 
                         this.classList.contains('word-medium') ? 1.15 : 1.1;
        
        this.style.transform = `translate(-50%, -50%) scale(${scaleValue}) rotate(${randomRotate}deg)`;
        
        // 添加随机颜色变化
        if (Math.random() > 0.6) {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
        }
    });
    
    wordElement.addEventListener('mouseleave', function() {
        const originalRotate = (Math.random() - 0.5) * 20;
        this.style.transform = `translate(-50%, -50%) scale(1) rotate(${originalRotate}deg)`;
        this.style.filter = 'none';
    });
    
    wordElement.addEventListener('click', function(e) {
        createRipple(this, e);
        createSparkle(this, e);
    });
}

// 创建粒子效果
function createParticles(container) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'word-cloud-particles';
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particleContainer.appendChild(particle);
    }
    
    container.appendChild(particleContainer);
}

// 创建星星效果
function createSparkle(element, event) {
    const sparkles = [];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 6;
        const distance = 20 + Math.random() * 10;
        
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${element.classList.contains('word-large') ? '#dc3545' : 
                         element.classList.contains('word-medium') ? '#4a90e2' : '#28a745'};
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: sparkle 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 20;
        `;
        
        // 设置粒子运动方向
        sparkle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        sparkle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        
        element.appendChild(sparkle);
        sparkles.push(sparkle);
    }
    
    setTimeout(() => {
        sparkles.forEach(sparkle => sparkle.remove());
    }, 800);
}

// 创建波纹效果
function createRipple(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// 添加波纹和星星动画CSS
const rippleCss = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

@keyframes sparkle {
    0% {
        transform: translate(-50%, -50%) translate(0, 0) scale(0);
        opacity: 1;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(1);
        opacity: 0;
    }
}
`;

// 动态添加CSS
const style = document.createElement('style');
style.textContent = rippleCss;
document.head.appendChild(style);

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    createBuddingChart();
    createExplorationChart();
    createCompetitionChart();
    createChangeChart();
    createWarChart();
    createAfterwarChart();
    createSeventeenChart();
    createSunburst('budding-sunburst', buddingSunburstData);
    createSunburst('exploration-sunburst', explorationSunburstData);
    createSunburst('competition-sunburst', competitionSunburstData);
    createSunburst('change-sunburst', changeSunburstData);
    createSunburst('war-sunburst', warSunburstData);
    createSunburst('afterwar-sunburst', afterwarSunburstData);
    createSunburst('seventeen-sunburst', seventeenSunburstData);
    createWordCloud('budding-word-cloud', buddingWords);
    createWordCloud('exploration-word-cloud', explorationWords);
    createWordCloud('competition-word-cloud', competitionWords);
    createWordCloud('change-word-cloud', changeWords);
    createWordCloud('war-word-cloud', warWords);
    createWordCloud('afterwar-word-cloud', afterwarWords);
    createWordCloud('seventeen-word-cloud', seventeenWords);
}); 