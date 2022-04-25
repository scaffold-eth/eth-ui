// import { smock } from '@defi-wonderland/smock';
import { should, use } from 'chai';
import { solidity } from 'ethereum-waffle';
import sinonChai from 'sinon-chai';

use(sinonChai);
use(solidity);

should(); // if you like should syntax
// use(smock.matchers);
