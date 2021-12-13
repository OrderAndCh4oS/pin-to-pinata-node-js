import getCreatedObjkts from './api/get-created-objkts.js';
import getCollectedObjkts from './api/get-collected-objkts.js';
import {getHash, makePinataPostData, pinHashes} from './utilities.js';

const createdObjkts = await getCreatedObjkts();
const collectedObjkts = await getCollectedObjkts();

const hashes = createdObjkts
    .concat(collectedObjkts)
    .reduce((arr, objkt) => {
        const artifactUriHash = getHash(objkt.artifact_uri);
        if(artifactUriHash) arr.push(
            makePinataPostData(objkt, artifactUriHash, 'artifactUri'));
        const displayUriHash = getHash(objkt.display_uri);
        if(displayUriHash) arr.push(
            makePinataPostData(objkt, displayUriHash, 'displayUri'));
        const metadataHash = getHash(objkt.metadata);
        if(metadataHash) arr.push(
            makePinataPostData(objkt, metadataHash, 'metadata'));
        return arr;
    }, []);

await pinHashes(hashes);
