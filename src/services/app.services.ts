const Usimeca = {
    name: 'Usimeca',
    url: 'erp.usimeca.ci',
    api: 'https://apps.usimeca.ci/api',
    logo: ''
}

const Tmsdesk = {
    name: 'Tmsdesk',
    url: 'tmsdesk.com',
    api: 'https://apps.tmsdesk.com/api',
    logo: ''
}


export const isApp:any = 'usimeca'
export const AppService = () => {
    return isApp == 'usimeca' ? Usimeca : Tmsdesk
}

