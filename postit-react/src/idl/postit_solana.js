export const idl = {
  "version": "0.1.0",
  "name": "postit_solana",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "customer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Post",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ],
  "metadata": {
    "address": "HrtnALGpHz67cyodA3tNU6axrjp3WVshXfXDtambhKBM"
  }
}