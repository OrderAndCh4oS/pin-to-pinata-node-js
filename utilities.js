import {getPins, postPinByHash} from './api/pinata.js';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
    minTime: 300
});

export const getHash = (str) => str?.slice(7) || null;

export const makePinataPostData = (objkt, hash, type) => {
    return {
        pinataMetadata: {
            name: objkt.title || objkt.name || objkt.id,
            keyvalues: {
                type,
                objkt: objkt.id,
                title: objkt.title || objkt.name
            }
        },
        hashToPin: hash
    };
};

export const pinHashes = async hashes => {
    const pins = await getPins();
    const pinnedHashes = pins.map(pr => pr.ipfs_pin_hash);

    let i = 0;
    for(const hash of hashes) {
        if(pinnedHashes.includes(hash.hashToPin)) continue;
        const response = await limiter.schedule(() => postPinByHash(hash));
        console.log(i, response);
        i++;
    }
};
