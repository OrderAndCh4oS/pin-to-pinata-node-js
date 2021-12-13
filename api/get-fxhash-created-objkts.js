import {gql, request} from 'graphql-request';
import getFxHashGenerativeTokens from './get-fxhash-generative-tokens.js';

// https://api.fxhash.xyz/graphiql
const query = gql`
    query Query($id: Float!, $skip: Int!) {
        generativeToken(id: $id) {
            objkts(take: 50, skip: $skip) {
                id
                name
                metadataUri
                metadata
            }
        }
    }
`;

const getFxHashCreatedObjkts = async(wallet) => {
    try {
        const generativeTokens = await getFxHashGenerativeTokens(wallet);
        const objkts = [];
        for(const generativeToken of generativeTokens) {
            let response;
            let skip = 0;
            do {
                response = await request(
                    'https://api.fxhash.xyz/graphql',
                    query,
                    {id: generativeToken.id, skip}
                );
                if(response?.generativeToken?.objkts?.length) {
                    objkts.push(...response.generativeToken.objkts);
                }
                skip += 50;
            } while(response?.generativeToken?.objkts?.length);
        }
        return {generativeTokens, objkts};
    } catch(e) {
        console.log('Error fetching created objkts');
        return null;
    }
};

export default getFxHashCreatedObjkts;
