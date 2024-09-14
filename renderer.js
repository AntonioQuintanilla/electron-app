const information = document.getElementById('info')
information.innerText = `Esta aplicación esta usando Chrome (v${versions.chrome()}) y Node.js (v${versions.node()}) y Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response)
}

func()