package main

import (
	"errors"
	"fmt"
	"math/big"
	"strings"
	"syscall/js"

	"github.com/loopexchange-labs/go-loopring-sig/eddsa"
	"github.com/loopexchange-labs/go-loopring-sig/poseidon"
	"github.com/loopexchange-labs/go-loopring-sig/utils"
)

func _getLockHashAndEddsaSignature(
	privateKey string,
	exchangeAddress string,
	accountId string,
	tokenId string,
	volume string,
	timestamp string,
) (string, error) {
	privateKeyBig := new(big.Int)
	exchangeAddressBig := new(big.Int)
	accountIdBig := new(big.Int)
	tokenIdBig := new(big.Int)
	volumeBig := new(big.Int)
	timestampBig := new(big.Int)

	privateKeyBig.SetString(strings.TrimPrefix(privateKey, "0x"), 16)
	exchangeAddressBig.SetString(strings.TrimPrefix(exchangeAddress, "0x"), 16)
	accountIdBig.SetString(accountId, 10)
	tokenIdBig.SetString(tokenId, 10)
	volumeBig.SetString(volume, 10)
	timestampBig.SetString(timestamp, 10)

	// fmt.Printf("privateKeyBig: %s\n", privateKeyBig.Text(10))
	// fmt.Printf("exchangeAddressBig: %s\n", exchangeAddressBig.Text(10))
	// fmt.Printf("accountIdBig: %s\n", accountIdBig.Text(10))
	// fmt.Printf("tokenIdBig: %s\n", tokenIdBig.Text(10))
	// fmt.Printf("volumeBig: %s\n", volumeBig.Text(10))
	// fmt.Printf("timestampBig: %s\n", timestampBig.Text(10))

	hash, err := poseidon.HashWithParams([]*big.Int{
		exchangeAddressBig,
		accountIdBig,
		tokenIdBig,
		volumeBig,
		timestampBig,
	}, 53)
	if err != nil {
		return "", err
	}

	var pk eddsa.PrivateKey //lint:ignore S1021 conversion
	pk = utils.BigIntLEBytes(privateKeyBig)
	sig := pk.SignPoseidon(hash)

	return "0x" +
		fmt.Sprintf("%064s", sig.R8.X.Text(16)) +
		fmt.Sprintf("%064s", sig.R8.Y.Text(16)) +
		fmt.Sprintf("%064s", sig.S.Text(16)), nil
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

	return _getLockHashAndEddsaSignature(
		privateKey,
		exchangeAddress,
		accountId,
		tokenId,
		volume,
		timestamp,
	)
}
