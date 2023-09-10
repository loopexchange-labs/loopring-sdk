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

	return loopring.GenerateKeyPair(
		signature,
	), nil
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
