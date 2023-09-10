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

func _getEddsaSigNftOrder(
	privateKey string,
	exchangeAddress string,
	storageId string,
	accountId string,
	sellTokenId string,
	buyTokenId string,
	sellTokenAmount string,
	buyTokenAmount string,
	validUntil string,
	maxFeeBips string,
	fillAmountBOrS string,
	takerAddress string,
) (string, error) {
	privateKeyBig := new(big.Int)
	exchangeAddressBig := new(big.Int)
	storageIdBig := new(big.Int)
	accountIdBig := new(big.Int)
	sellTokenIdBig := new(big.Int)
	buyTokenIdBig := new(big.Int)
	sellTokenAmountBig := new(big.Int)
	buyTokenAmountBig := new(big.Int)
	validUntilBig := new(big.Int)
	maxFeeBipsBig := new(big.Int)
	fillAmountBOrSBig := new(big.Int)
	takerAddressBig := new(big.Int)

	privateKeyBig.SetString(strings.TrimPrefix(privateKey, "0x"), 16)
	exchangeAddressBig.SetString(strings.TrimPrefix(exchangeAddress, "0x"), 16)
	storageIdBig.SetString(storageId, 10)
	accountIdBig.SetString(accountId, 10)
	sellTokenIdBig.SetString(sellTokenId, 10)
	if strings.HasPrefix(buyTokenId, "0x") {
		buyTokenIdBig.SetString(strings.TrimPrefix(buyTokenId, "0x"), 16)
	} else {
		buyTokenIdBig.SetString(buyTokenId, 10)
	}
	sellTokenAmountBig.SetString(sellTokenAmount, 10)
	buyTokenAmountBig.SetString(buyTokenAmount, 10)
	validUntilBig.SetString(validUntil, 10)
	maxFeeBipsBig.SetString(maxFeeBips, 10)
	fillAmountBOrSBig.SetString(fillAmountBOrS, 10)
	takerAddressBig.SetString(strings.TrimPrefix(takerAddress, "0x"), 16)

	// fmt.Printf("privateKeyBig: %s\n", privateKeyBig.Text(10))
	// fmt.Printf("exchangeAddressBig: %s\n", exchangeAddressBig.Text(10))
	// fmt.Printf("storageIdBig: %s\n", storageIdBig.Text(10))
	// fmt.Printf("accountIdBig: %s\n", accountIdBig.Text(10))
	// fmt.Printf("sellTokenIdBig: %s\n", sellTokenIdBig.Text(10))
	// fmt.Printf("buyTokenIdBig: %s\n", buyTokenIdBig.Text(10))
	// fmt.Printf("sellTokenAmountBig: %s\n", sellTokenAmountBig.Text(10))
	// fmt.Printf("buyTokenAmountBig: %s\n", buyTokenAmountBig.Text(10))
	// fmt.Printf("validUntilBig: %s\n", validUntilBig.Text(10))
	// fmt.Printf("maxFeeBipsBig: %s\n", maxFeeBipsBig.Text(10))
	// fmt.Printf("fillAmountBOrSBig: %s\n", fillAmountBOrSBig.Text(10))
	// fmt.Printf("takerAddressBig: %s\n", takerAddressBig.Text(10))

	hash, err := poseidon.Hash([]*big.Int{
		exchangeAddressBig,
		storageIdBig,
		accountIdBig,
		sellTokenIdBig,
		buyTokenIdBig,
		sellTokenAmountBig,
		buyTokenAmountBig,
		validUntilBig,
		maxFeeBipsBig,
		fillAmountBOrSBig,
		takerAddressBig,
	})
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

	return _getEddsaSigNftOrder(
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
