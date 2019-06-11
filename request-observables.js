const fetch = require('node-fetch');
const { Observable } = require('rxjs');

function getEntries(environment) {
    return new Observable((subscriber) => {
        const url = `https://cdn.contentstack.io/v3/content_types/activities_videos_v1/entries?environment=development`;
        const options = {
            method: 'get',
            headers: { 'authtoken': 'blt642539497f2870a5', 'api_key': 'blt86d0be10341e1f50' },
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                subscriber.next(json.entries);
                subscriber.complete();
            });
    });
}

function syncToS3(entries) {
    const onlyTitles = entries.map(e => e.title);
    console.log('Syncing in s3...');
    console.log(onlyTitles);
}

getEntries('dev').subscribe(syncToS3);
