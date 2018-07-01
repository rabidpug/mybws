import { darken, lighten, } from 'polished';

import createSelector from 'selectorator';

const get = {
  colours: {
    complementary   : createSelector( [ 'theme.colours.complementary', ] ),
    complementaryD1 : createSelector( [ 'theme.colours.complementary', ], colour => darken( 0.1, colour ) ),
    complementaryD2 : createSelector( [ 'theme.colours.complementary', ], colour => darken( 0.2, colour ) ),
    complementaryL1 : createSelector( [ 'theme.colours.complementary', ], colours => lighten( 0.1, colours ) ),
    complementaryL2 : createSelector( [ 'theme.colours.complementary', ], colours => lighten( 0.2, colours ) ),
    grey            : createSelector( [ 'theme.colours.grey', ] ),
    greyD1          : createSelector( [ 'theme.colours.grey', ], colour => darken( 0.1, colour ) ),
    greyD2          : createSelector( [ 'theme.colours.grey', ], colour => darken( 0.2, colour ) ),
    greyL1          : createSelector( [ 'theme.colours.grey', ], colour => lighten( 0.1, colour ) ),
    greyL2          : createSelector( [ 'theme.colours.grey', ], colour => lighten( 0.2, colour ) ),
    primary         : createSelector( [ 'theme.colours.primary', ] ),
    primaryD1       : createSelector( [ 'theme.colours.primary', ], colour => darken( 0.1, colour ) ),
    primaryD2       : createSelector( [ 'theme.colours.primary', ], colour => darken( 0.2, colour ) ),
    primaryL1       : createSelector( [ 'theme.colours.primary', ], colours => lighten( 0.1, colours ) ),
    primaryL2       : createSelector( [ 'theme.colours.primary', ], colours => lighten( 0.2, colours ) ),
    secondary       : createSelector( [ 'theme.colours.secondary', ] ),
    secondaryD1     : createSelector( [ 'theme.colours.secondary', ], colour => darken( 0.1, colour ) ),
    secondaryD2     : createSelector( [ 'theme.colours.secondary', ], colour => darken( 0.2, colour ) ),
    secondaryL1     : createSelector( [ 'theme.colours.secondary', ], colours => lighten( 0.1, colours ) ),
    secondaryL2     : createSelector( [ 'theme.colours.secondary', ], colours => lighten( 0.2, colours ) ),
    supplementary   : createSelector( [ 'theme.colours.supplementary', ] ),
    supplementaryD1 : createSelector( [ 'theme.colours.supplementary', ], colour => darken( 0.1, colour ) ),
    supplementaryD2 : createSelector( [ 'theme.colours.supplementary', ], colour => darken( 0.2, colour ) ),
    supplementaryL1 : createSelector( [ 'theme.colours.supplementary', ], colours => lighten( 0.1, colours ) ),
    supplementaryL2 : createSelector( [ 'theme.colours.supplementary', ], colours => lighten( 0.2, colours ) ),
    white           : createSelector( [ 'theme.colours.grey', ], colour => lighten( 0.4, colour ) ),
    whiteD1         : createSelector( [ 'theme.colours.grey', ], colour => lighten( 0.35, colour ) ),
    whiteD2         : createSelector( [ 'theme.colours.grey', ], colour => lighten( 0.3, colour ) ),
    whiteL1         : createSelector( [ 'theme.colours.grey', ], colour => lighten( 0.42, colour ) ),
    whiteL2         : createSelector( [ 'theme.colours.grey', ], colour => lighten( 0.44, colour ) ),
  },
  scrollBar: createSelector( [ 'theme.scrollBar', ] ),
};

export default get;
