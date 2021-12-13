import getObjktCreations from './api/get-objkt-creations.js';
import {getHash, makePinataPostData, pinHashes} from './utilities.js';

const createdObjkts = await getObjktCreations(
    ['KT1KYjLBbv8oq1WAYJnoefoqEpoxCvWLUseN']);

const hashes = createdObjkts.reduce((arr, objkt) => {
        const artifactUriHash = getHash(objkt.metadata?.artifactUri);
        if(artifactUriHash) arr.push(
            makePinataPostData(objkt, artifactUriHash, 'artifactUri')
        );
        const displayUriHash = getHash(objkt.metadata?.display_uri);
        if(displayUriHash) arr.push(
            makePinataPostData(objkt, displayUriHash, 'displayUri')
        );
        const thumbnailUriHash = getHash(objkt.metadata?.thumbnail_uri);
        if(thumbnailUriHash) arr.push(
            makePinataPostData(objkt, thumbnailUriHash, 'thumbnailUri')
        );
        const metadataHash = getHash(objkt.metadata);
        if(metadataHash) arr.push(
            makePinataPostData(objkt, metadataHash, 'metadata')
        );
        return arr;
    }, []
);

await pinHashes(hashes);
