'use strict';
var request = require('request')

module.exports = {
    attachToMesh: (req, res) => {
        console.log();

        var command = {
            'command': 'attachToMesh',
            'trunkTransaction': req.query.trunck,
            'branchTransaction': req.query.branch,
            'minWeightMagnitude': 18,
            'trytes': ['RAWTRYTES']
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(command).length
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    },
    getNodeInfo: (req, res) => {
        console.log("getNodeinfo")
        var command = {
            'command': 'getNodeInfo'
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                res.json(data)
            }
        });
    },
    getBalances: (req, res) => {
        console.log("!@!@!@!@!@!@getBalance")
        var command = {
            'command': 'getBalances',
            'addresses': [req.query.address],
            'threshold': 100
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(command).length
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (error) {
                res.json(error);
                console.log(err);
            } else if (data && response.statusCode == 200) {
                res.json(data)
                console.log(response)
            }

        });
    },
    broadcastTransactions: (req, res) => {
        console.log("broadcastTransaction")
        var command = {
            'command': 'broadcastTransactions',
            'trytes': ['BHEXYPFRIGBSBGQLPFPEROJRJIYFNUNLYZHXNJY9FOQXTXXFIIODEBYENQVKJBHOBZFHATCUGHKGNXFOQO9TDIOVGKJJILQURSZKLNPIUUOVHUG9SGRRGUDTGLLUSFA9NOZNFRCRTPDEQQIBIEDMYQKHVJPUBTOQNKGQX9ZRSKWQUALHRUNKIBQMFFRHZVISUSXMYCLVHODMNT9MKFJXRBAGKL9PQSIHT9ILVO99ASTOUWZSDVSAJNPYQSSWQHLDAOPXYSTNQTUUNE9ALBVRYAJGKIJTASKSZNYYSTXHYDUSJNFDIPIFYAXPMQUGQRMMADQBXBATNMWZSYBDAGFPTLDQTMUVEYNRBQXOTQMTEZHVJZEKE9HHGKLUUCAFTJBQNJUQCIACPZWU9S9TEMQKEP9SKGSLLHVLPHQVVTTNCAFGPGRHROPFHJGDTPGXNK9PZQASVXVLDHYTJRMCQWFQZFFFNJZFVQDZE9HMATDIWIJHNNCIHASXOLHZWMPICZHEFUDYZYOWBTSGMDDPILBCPGFKIMTNZFCUJKEAUIASKGCCQGEW9QZ9TSNQHAFYYJSTHOKOLGPXYVQZXNPVUGQMOIJWZZYGVYXXFCUCNLAAXSEGHRONQKFCRHHWFIKJFDVA9NCMXTAKRRIMJJUXJGZYQOGQUZEBTCDYQBLLRHKHPJRQRVGYGQKOGCQBJHPJLVDRWHJCSSMUIXBJGMJLGCYYMDBGPEEQTNDLKLGYZDKXEDDCJUCC9ETMCWPJUDGENHOLPGJGZVMBIBUXMACX9RKSXRSGQYAUFIDVIEIIKAASCWMRSZNDVGHCE9DLWHYGDTFKUT9SJKJQXFJCMGKLWXTJQOXBPNHEUWGZFCAPPSVIJKATJNFDPVCKLCTNOTOLEOTXL9CBDJFWWHWGHWAW9PGLJVAUNVKAMJXMGZCD9CZZVRWBV9UMBSKCSE9MBXVUEKSD9CPVDRJAAVWVHOQNQZZAORZVYSDQVLWRHNYOVBEO9YDXZGZQVLADMLGDQYFWSWLBB9KNCDL9JOXLTNSIDFVKOKPBBIT9VIQQZFANVAPKEYUIUELVVZCLTPSKRWJXUWAUZCXLJYYYOCTUUOYQOSYUVJNCJHGKMWPU99XLE9NASIXDTBQNSQG9RHWZTSFEBESALSMNJQPVNAIVRHUNRHCGDVHIOEDJSCKBSIQZKOXTOJUKQH9Q9LYWIHLMJIHYKDABVNIBQCINEMVUYHXTPDMUSGKS9XQV9ZHQDGNLAOJVCWRPHDCYUFOTXBXZHVVAQ9DFLUVMQKFHLXASTVIHZWKDMLUNQWJQUBYXDHCLKBCDXZLGQYDJHECJSYANQCAIEFF9QCGZVNSXZIVOCZZTYGCOTCIHAMSFGCPHVR9XNXZIZJX9CNYEYHHICMLTKUOCGTFBMHLDTUBOQSGE9KJOLQOJW9ARHSRXQTJTHHYVVXWMDWOWPAIG9GXYVMVHUDTXIHLMZCGOSICRCSCDBFVBNT9M9ZHOXMNTOEGUDDCGD9UXPZMGIGVOTDAOSHCGTXUTUSIXEMGS9TAVODXTYNZYUYOPFHF9NQAXE9YJLFXAYJYZMCG9HZTFHRUCOTTJLJAQWXWFTWICDGRQMIJEKTRWSIIK999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999DAQRHWD99A99999999A99999999VSIEYBNRKEGNKNWYJASK9JBZKYCSOOBBYUZRP9NMPIWRFTELRONZSZEUVBANLHFXYDHDIFNTCZJRGKRWVSEOPZBLXMYUR9XOTVPZKOVVTIBDVMYAQCF9TXKYUBCY9WFGUUJXYDGIKUPMLAKLIBLWZKVKLSTT999999RLQBJJHKDGCAXOCGCPYMPX9SKXK9HGTJKT9JQUOEZXIHEOGEABRNBMTXIDBOWGYESQCQGBPQTEB999999RAPNXVJRYCBIKYW9IMEKDDBNKSVOPKYHLDKZSNFEEICKEEJJCOSMFATAWFPKOZQMYRK9CFMMLIXV9AJW']
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    },

    findTransactions: (req, res) => {
        console.log('findTransactions')
        var command = {
            'command': 'findTransactions',
            'addresses': ['DROQPLEJFRSDBXPAUUHTXIRLKCLBMERJCAJYQAASQBEA9R9KTLQIHFCDRGMEGNAETZGJFBVIUCUWUVWBBYEVLSXTFW']

        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Length': JSON.stringify(command).length
            },
            json: command
        };

        request.post(options, function (error, response, data) {
            if (error) {
                res.json(error);
                console.log(data);
            } else if (data && response.statusCode == 200) {
                res.json(data);
                console.log(response)
            }
        });
    },

    getInclusionStates: (req, res) => {
        console.log("getInclusionStates")
        var command = {
            'command': 'getInclusionStates',
            'transactions': ['GMJYGKPMRIIQBNADRKSKZ9TJKEMIMKXTNXVBKXWSMLKLVSWCXYRQRAIPBMEEJEDBDZ9NWBQBRSZ999999'],
            'tips': ['BCBHKWSBJNLLSTYEJKYDQYITCIBXCWHKYXWKSSNGODPJLTUW9EKD9PYCAKQBCBPBIMCYONOEYRZ999999']
        }

        var options = {
            url: 'http://localhost:14265',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(command).length
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    },
    getTips: (req, res) => {
        console.log("getTips")
        var request = require('request');

        var command = {
            'command': 'getTips'
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    },
    getTransactionApprove: (req, res) => {
        console.log("getTransactionApprove")
        var command = {
            'command': 'getTransactionsToApprove',
            'depth': 10
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    },
    getTrytes: (req, res) => {
        var command = {
            'command': 'getTrytes',
            'hashes': ['CGWKDBEGLULSRCZVIUFKBTZYDYUWUGMXVJRTTXKBSMMNSITMAQMQNGYFNYPNGVCSHNVHDMVOOTQ999999']
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(command).length
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    },
    interruptAttachingToMesh: (req, res) => {
        console.log("interruptAttachingToMesh")
        var command = {
            'command': 'interruptAttachingToMesh'
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    },
    storeTransactions: (req, res) => {
        console.log("storeTransactions")
        var command = {
            'command': 'storeTransactions',
            'trytes': ['BHEXYPFRIGBSBGQLPFPEROJRJIYFNUNLYZHXNJY9FOQXTXXFIIODEBYENQVKJBHOBZFHATCUGHKGNXFOQO9TDIOVGKJJILQURSZKLNPIUUOVHUG9SGRRGUDTGLLUSFA9NOZNFRCRTPDEQQIBIEDMYQKHVJPUBTOQNKGQX9ZRSKWQUALHRUNKIBQMFFRHZVISUSXMYCLVHODMNT9MKFJXRBAGKL9PQSIHT9ILVO99ASTOUWZSDVSAJNPYQSSWQHLDAOPXYSTNQTUUNE9ALBVRYAJGKIJTASKSZNYYSTXHYDUSJNFDIPIFYAXPMQUGQRMMADQBXBATNMWZSYBDAGFPTLDQTMUVEYNRBQXOTQMTEZHVJZEKE9HHGKLUUCAFTJBQNJUQCIACPZWU9S9TEMQKEP9SKGSLLHVLPHQVVTTNCAFGPGRHROPFHJGDTPGXNK9PZQASVXVLDHYTJRMCQWFQZFFFNJZFVQDZE9HMATDIWIJHNNCIHASXOLHZWMPICZHEFUDYZYOWBTSGMDDPILBCPGFKIMTNZFCUJKEAUIASKGCCQGEW9QZ9TSNQHAFYYJSTHOKOLGPXYVQZXNPVUGQMOIJWZZYGVYXXFCUCNLAAXSEGHRONQKFCRHHWFIKJFDVA9NCMXTAKRRIMJJUXJGZYQOGQUZEBTCDYQBLLRHKHPJRQRVGYGQKOGCQBJHPJLVDRWHJCSSMUIXBJGMJLGCYYMDBGPEEQTNDLKLGYZDKXEDDCJUCC9ETMCWPJUDGENHOLPGJGZVMBIBUXMACX9RKSXRSGQYAUFIDVIEIIKAASCWMRSZNDVGHCE9DLWHYGDTFKUT9SJKJQXFJCMGKLWXTJQOXBPNHEUWGZFCAPPSVIJKATJNFDPVCKLCTNOTOLEOTXL9CBDJFWWHWGHWAW9PGLJVAUNVKAMJXMGZCD9CZZVRWBV9UMBSKCSE9MBXVUEKSD9CPVDRJAAVWVHOQNQZZAORZVYSDQVLWRHNYOVBEO9YDXZGZQVLADMLGDQYFWSWLBB9KNCDL9JOXLTNSIDFVKOKPBBIT9VIQQZFANVAPKEYUIUELVVZCLTPSKRWJXUWAUZCXLJYYYOCTUUOYQOSYUVJNCJHGKMWPU99XLE9NASIXDTBQNSQG9RHWZTSFEBESALSMNJQPVNAIVRHUNRHCGDVHIOEDJSCKBSIQZKOXTOJUKQH9Q9LYWIHLMJIHYKDABVNIBQCINEMVUYHXTPDMUSGKS9XQV9ZHQDGNLAOJVCWRPHDCYUFOTXBXZHVVAQ9DFLUVMQKFHLXASTVIHZWKDMLUNQWJQUBYXDHCLKBCDXZLGQYDJHECJSYANQCAIEFF9QCGZVNSXZIVOCZZTYGCOTCIHAMSFGCPHVR9XNXZIZJX9CNYEYHHICMLTKUOCGTFBMHLDTUBOQSGE9KJOLQOJW9ARHSRXQTJTHHYVVXWMDWOWPAIG9GXYVMVHUDTXIHLMZCGOSICRCSCDBFVBNT9M9ZHOXMNTOEGUDDCGD9UXPZMGIGVOTDAOSHCGTXUTUSIXEMGS9TAVODXTYNZYUYOPFHF9NQAXE9YJLFXAYJYZMCG9HZTFHRUCOTTJLJAQWXWFTWICDGRQMIJEKTRWSIIK999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999DAQRHWD99A99999999A99999999VSIEYBNRKEGNKNWYJASK9JBZKYCSOOBBYUZRP9NMPIWRFTELRONZSZEUVBANLHFXYDHDIFNTCZJRGKRWVSEOPZBLXMYUR9XOTVPZKOVVTIBDVMYAQCF9TXKYUBCY9WFGUUJXYDGIKUPMLAKLIBLWZKVKLSTT999999RLQBJJHKDGCAXOCGCPYMPX9SKXK9HGTJKT9JQUOEZXIHEOGEABRNBMTXIDBOWGYESQCQGBPQTEB999999RAPNXVJRYCBIKYW9IMEKDDBNKSVOPKYHLDKZSNFEEICKEEJJCOSMFATAWFPKOZQMYRK9CFMMLIXV9AJWP']
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    }

}