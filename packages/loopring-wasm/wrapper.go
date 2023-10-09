package main

import (
	"errors"
	"syscall/js"

	"github.com/loopexchange-labs/go-loopring-sig/loopring"
)

func generateKeyPair(_ js.Value, args []js.Value) (interface{}, error) {
	if len(args) != 1 {
		return nil, errors.New("not enough arguments")
	}

	signature := args[0].String()

	// fmt.Printf("signature: %s\n", signature)

	keyPair, err := loopring.GenerateKeyPair(signature)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"keyPair": map[string]interface{}{
			"publicKeyX": keyPair.PublicKeyX.String(),
			"publicKeyY": keyPair.PublicKeyY.String(),
			"secretKey":  keyPair.SecretKey.String(),
		},
		"formatedPx": keyPair.FormatPublicKeyX(),
		"formatedPy": keyPair.FormatPublicKeyY(),
		"sk":         keyPair.FormatSecretKey(),
	}, nil
}

func signRequest(_ js.Value, args []js.Value) (interface{}, error) {
	if len(args) != 5 {
		return nil, errors.New("not enough arguments")
	}

	privateKey := args[0].String()
	method := args[1].String()
	baseUrl := args[2].String()
	path := args[3].String()
	data := args[4].String()

	// fmt.Printf("privateKey: %s\n", privateKey)
	// fmt.Printf("method: %s\n", method)
	// fmt.Printf("baseUrl: %s\n", baseUrl)
	// fmt.Printf("path: %s\n", path)
	// fmt.Printf("data: %s\n", data)

	return loopring.SignRequest(privateKey, method, baseUrl, path, data)
}

func getEddsaSigNftOrder(_ js.Value, args []js.Value) (interface{}, error) {
	if len(args) != 12 {
		return nil, errors.New("not enough arguments")
	}

	privateKey := args[0].String()
	exchangeAddress := args[1].String()
	storageId := args[2].String()
	accountId := args[3].String()
	sellTokenId := args[4].String()
	buyTokenId := args[5].String()
	sellTokenAmount := args[6].String()
	buyTokenAmount := args[7].String()
	validUntil := args[8].String()
	maxFeeBips := args[9].String()
	fillAmountBOrS := args[10].String()
	takerAddress := args[11].String()

	// fmt.Printf("privateKey: %s\n", privateKey)
	// fmt.Printf("exchangeAddress: %s\n", exchangeAddress)
	// fmt.Printf("storageId: %s\n", storageId)
	// fmt.Printf("accountId: %s\n", accountId)
	// fmt.Printf("sellTokenId: %s\n", sellTokenId)
	// fmt.Printf("buyTokenId: %s\n", buyTokenId)
	// fmt.Printf("sellTokenAmount: %s\n", sellTokenAmount)
	// fmt.Printf("buyTokenAmount: %s\n", buyTokenAmount)
	// fmt.Printf("validUntil: %s\n", validUntil)
	// fmt.Printf("maxFeeBips: %s\n", maxFeeBips)
	// fmt.Printf("fillAmountBOrS: %s\n", fillAmountBOrS)
	// fmt.Printf("takerAddress: %s\n", takerAddress)

	return loopring.GetEddsaSigNftOrder(
		privateKey,
		exchangeAddress,
		storageId,
		accountId,
		sellTokenId,
		buyTokenId,
		sellTokenAmount,
		buyTokenAmount,
		validUntil,
		maxFeeBips,
		fillAmountBOrS,
		takerAddress,
	)
}

func getLockHashAndEddsaSignature(_ js.Value, args []js.Value) (interface{}, error) {
	if len(args) != 6 {
		return nil, errors.New("not enough arguments")
	}

	privateKey := args[0].String()
	exchangeAddress := args[1].String()
	accountId := args[2].String()
	tokenId := args[3].String()
	volume := args[4].String()
	timestamp := args[5].String()

	// fmt.Printf("privateKey: %s\n", privateKey)
	// fmt.Printf("exchangeAddress: %s\n", exchangeAddress)
	// fmt.Printf("accountId: %s\n", accountId)
	// fmt.Printf("storageId: %s\n", tokenId)
	// fmt.Printf("volume: %s\n", volume)
	// fmt.Printf("timestamp: %s\n", timestamp)

	return loopring.GetLockHashAndEddsaSignature(
		privateKey,
		exchangeAddress,
		accountId,
		tokenId,
		volume,
		timestamp,
	)
}
