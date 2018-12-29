interface PureClassConfig {
    def: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number
}

const PureClassPrefix = {
    def : 'pure-u-',
    sm : 'pure-u-sm-',
    md : 'pure-u-md-',
    lg : 'pure-u-lg-',
    xl : 'pure-u-xl-'
};

let pure = function (config: PureClassConfig) {
    let pureString: string = '';

    for (let pureClass in config) {
        pureString += PureClassPrefix[pureClass] + config[pureClass] + '-24 ';
    }

    return pureString;
};

export {pure};
