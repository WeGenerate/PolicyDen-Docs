<?php
$root='/Users/mac/.t3/worktrees/PolicyDen-App/t3-49013fa2';
require "$root/vendor/autoload.php";
$app=require "$root/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
use Illuminate\Support\Facades\DB;
use App\Models\User\User;
if (!$app->environment('local') || config('database.default')!=='pgsql' || config('database.connections.pgsql.database')!=='policyden_docs_demo' || DB::selectOne('select current_database() as name')->name!=='policyden_docs_demo') throw new Exception('Unsafe database');
$email='casey.tutorial@example.com';
$u=User::whereEmail($email)->first();
if (($argv[1]??'')==='verify') { echo json_encode(['status'=>$u?->status,'name'=>$u?->name,'role'=>$u?->getRoleForMainAgency(),'address'=>$u?->address,'npn'=>$u?->npn]); exit; }
if (!$u) {
 $agency=User::whereEmail('jordan.rivera@example.com')->firstOrFail()->mainAgency;
 if (!$agency || $agency->status!=='active') throw new Exception('Missing demo agency');
 $u=User::create(['email'=>$email,'first_name'=>'Casey','last_name'=>'Taylor','status'=>'pending','password'=>Illuminate\Support\Str::random(40)]);
 $u->agencies()->attach($agency->id,['role'=>'agent','main'=>true]);
}
if ($u->status!=='pending') throw new Exception('Existing tutorial already completed; refusing to reset');
file_put_contents(__DIR__.'/output/invitation.json',json_encode(['url'=>'https://policyden-docs-demo.test/join?hash='.urlencode(Illuminate\Support\Facades\Crypt::encryptString($u->id))]));
chmod(__DIR__.'/output/invitation.json',0600);
echo "Verified local demo invitation ready\n";
