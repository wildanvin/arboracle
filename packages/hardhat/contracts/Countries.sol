// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Arboracle.sol";

contract BrazilArboracle is Arboracle {
    constructor() Arboracle("Brazilian Rainforest ARB-C-110") public { }
}

contract ColombiaArboracle is Arboracle {
    constructor() Arboracle("Colombian Moorland ARB-C-010") public { }
}

contract CostaRicaArboracle is Arboracle {
    constructor() Arboracle("Costa Rica Rainforest ARB-A-100") public { }
}
