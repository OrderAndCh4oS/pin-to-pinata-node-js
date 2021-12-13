import getFxHashCollectedObjkts from './api/get-fxhash-collected-objkts.js';
import {wallets} from './constants.js';
import getFxHashCreatedObjkts from './api/get-fxhash-created-objkts.js';
import {getHash, makePinataPostData, pinHashes} from './utilities.js';

const collectedObjkts = await getFxHashCollectedObjkts(wallets[1]);
const createdGenerativeTokens = await getFxHashCreatedObjkts(wallets[1]);

const hashes = collectedObjkts
    .concat(
        createdGenerativeTokens.objkts,
        createdGenerativeTokens.generativeTokens
    ).reduce((arr, objkt) => {
            const artifactUriHash = getHash(objkt.metadata?.artifactUri);
            if(artifactUriHash) arr.push(
                makePinataPostData(objkt, artifactUriHash, 'artifactUri')
            );
            const displayUriHash = getHash(objkt.metadata?.displayUri);
            if(displayUriHash) arr.push(
                makePinataPostData(objkt, displayUriHash, 'displayUri')
            );
            const thumbnailUriHash = getHash(objkt.metadata?.thumbnailUri);
            if(thumbnailUriHash) arr.push(
                makePinataPostData(objkt, thumbnailUriHash, 'thumbnailUri')
            );
            const generativeUriHash = getHash(objkt.metadata?.generativeUri);
            if(generativeUriHash) arr.push(
                makePinataPostData(objkt, generativeUriHash, 'generativeUri')
            );
            const metadataHash = getHash(objkt.metadataUri);
            if(metadataHash) arr.push(
                makePinataPostData(objkt, metadataHash, 'metadata')
            );
            return arr;
        }, []
    );

await pinHashes(hashes);
