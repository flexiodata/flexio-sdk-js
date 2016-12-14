var ini = require('ini')
var http = require('http');
var fs = require('fs');
var readline = require('readline');
var flexio = require('./flexio.js');

var g_config_file = '';
var g_profile = 'default';
var g_flexio = new flexio;



function configure(profile_name)
{
    process.stdout.write("Configuring profile '" + profile_name + "'\n");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter your API key: ", (apikey) => {
        rl.close();
        if (apikey.length > 0)
        {
            var config = {};
            try
            {
                config = ini.parse(fs.readFileSync(g_config_file, 'utf-8'));
            }
            catch (e)
            {
            }

            var ini_group = "profile " + profile_name;
            config[ini_group] = {};
            config[ini_group].api_key = apikey;

            fs.writeFileSync(g_config_file, ini.stringify(config));
        }
         else
        {
            process.stdout.write('Cancelled');
        }

    });

}


function determineConfigFilePath(argv)
{
    g_config_file = '';

    if (process.env.FLEXIO_CONFIG_FILE)
    {
        g_config_file = process.env.FLEXIO_CONFIG_FILE;
    }

    homedir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

    if (homedir.length > 0)
    {
        g_config_file = homedir;
    }
     else
    {
        // no home dir
        g_config_file = process.platform == 'win32' ? process.env.windir : '/etc';
    }

    // convert all slashes to forward slashes
    g_config_file.replace(/\\/g, '/');

    if (g_config_file.length == 0 || g_config_file[g_config_file.length-1] != '/')
        g_config_file += '/';

    g_config_file += ".flexio";

    if (!fs.existsSync(g_config_file))
    {
        fs.mkdirSync(g_config_file);
    }

    g_config_file += "/config";
}

function loadConfigFile()
{
    var config = {};
    try
    {
        config = ini.parse(fs.readFileSync(g_config_file, 'utf-8'));
    }
    catch (e)
    {
        // cannot load ini file
        return;
    }

    if (!config.hasOwnProperty("profile " + g_profile))
    {
        // no profile
        throw("No profile");
    }

    var apikey = config["profile " + g_profile].api_key;
    g_flexio.setApiKey(apikey);
}

function displayUsage()
{
    process.stdout.write("Usage: flexio <command>\n\n");
    process.stdout.write("where <command> is one of:\n");
    process.stdout.write("configure     configure the command line client\n");
    process.stdout.write("help          display this help message\n");
    process.stdout.write("pipes         pipe-related commands\n");
    process.stdout.write("version       display current version\n");
    
    process.stdout.write("\nExamples:\n");
    process.stdout.write("flexio pipes run l0kfynlhfqnf *.txt\n");
    process.stdout.write("flexio pipes run l0kfynlhfqnf file1.txt\n");
    process.stdout.write("flexio pipes run l0kfynlhfqnf -         (uses stdin as input)\n");
}

function main()
{
    determineConfigFilePath(process.argv);

    if (process.argv.length == 2) // if no arguments specified
    {
        displayUsage();
        return;
    }

    var pclass = process.argv[2] || '';
    var pverb = process.argv[3] || '';


    if (pclass == "help")
    {
        displayUsage();
    }
    else if (pclass == "configure")
    {
        configure(process.argv[3] || 'default');
    }
    else if (pclass == "pipes" && pverb == "run")
    {
        var pipe = process.argv[4] || '';
        if (pipe.length == 0)
        {
            displayUsage();
        }
         else
        {
            loadConfigFile("default");

            g_flexio.setHost("www.flex.io");
            g_flexio.setPort(443);
            g_flexio.setPipe(pipe);

            g_flexio.addFile("/Users/biwillia/test.txt");
            g_flexio.run();
        }
    }
}

main();

