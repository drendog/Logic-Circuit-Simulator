export const MouseAction =
{
    EDIT: 0,
    MOVE: 1,
    DELETE: 2
}

export const gateType =
{
    NONE: 0, // for testing usage
    NOT: 1,
    AND: 2,
    NAND: 3,
    OR: 4,
    NOR: 5,
    XOR: 6,
    XNOR: 7
};

export const IC_type =
{
    NONE: 0, // for testing usage
    SR_LATCH_ASYNC: 1,
    SR_LATCH_SYNC: 2,
    FF_D_SINGLE: 3,
    FF_D_MASTERSLAVE: 4,
    FF_T: 5,
    FF_JK: 6
}

export const ElementType =
{
    NONE: 0, // for testing usage
    LOGIC_GATE: 1,
    FLIP_FLOP: 2,
    LOGIC_INPUT: 3,
    LOGIC_OUTPUT: 4
}

export const syncType =
{
    ASYNC: 0,
    SYNC: 1
}

export const INPUT_STATE =
{
    FREE: 0,
    TAKEN: 1,
}