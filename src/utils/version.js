import axios from 'axios';
import packageConfig from '../../package.json' assert { type: 'json' };

export const verifyAppVersion = async function() {
    let response = await axios.get('https://api.github.com/repos/mrgasparini/ClashOfCars-Bot/releases/latest');

    if(response.status === 200 && response.data.tag_name !== packageConfig.version) {
        console.log(`⚠️ ⚠️ ⚠️ Atenção! Uma nova versão do bot foi liberada. Atualize para não perder os novos recursos. ⚠️ ⚠️ ⚠️`)
    }
}