const Usimeca = {
    name: 'Usimeca',
    url: 'erp.usimeca.ci',
    api: 'https://api.usimeca.ci/api',
    logo: ''
}

const Tmsdesk = {
    name: 'TRANSLOG MULTI-SERVICES',
    url: 'tmsdesk.com',
    api: 'https://apps.tmsdesk.com/api',
    logo: ''
}


export const isApp:any = 'usimecaKey'
export const AppService = () => {
    return isApp == 'usimeca' ? Usimeca : Tmsdesk
}

